// anoInicio,mesInicio,diaInicio
// anoFim,mesFim,diaFim
exports.getDt = function(ano,mes,dia){
    return ee.Date(ano +'-'+ mes +'-'+ dia);
};

exports.getRange = function(dtInicio,dtFim){
    return ee.DateRange(dtInicio,dtFim);
};

exports.getFilterDateBoundsClouds = function(collectID, data, geometryBounds, cloudsMaxLimit, config){
    return ee.ImageCollection(collectID).filterDate(data)
    .filterBounds(geometryBounds)
    .filter(ee.Filter.lt(config.cloudsProperty,cloudsMaxLimit));
};

//chamar dentro de um map - dataset
exports.getIntercectionAndCota = function(geometry, cotaStr, dateFormat, image, cotaReservatorioANA){
    var intersecao = image.geometry().intersection(geometry,ee.ErrorMargin(1));
    var porcentagem_intersecao = ee.Number((intersecao.area().multiply(100)).divide(geometry.area()).round());
    
    var data = ee.Date(image.get('system:time_start')).format(dateFormat);
    var cota = cotaReservatorioANA.get(data,cotaStr);
    
    return image.set('data',data,'intersection', porcentagem_intersecao,'cota', cota);
}; 

exports.intercectionMapper = function(image, geometry){
    image = ee.Image(image);
    return getIntercectionAndCota(geometry, '220', "dd/MM/YYYY", image);
};

exports.getCollectionMappedByIntercection = function(dataset, intercectionMapper){
    return dataset.map(intercectionMapper)
    .filter(ee.Filter.gte('intersection',100));
};

exports.getProjection = function(dataset, band){
    return ee.Image(dataset.first()).select(band).projection();
};

exports.getTotalPixels = function(geometry, dataset, band, projection){
  return ee.Image(dataset.first()).select(band).reduceRegion(ee.Reducer.count(), 
    geometry,
    projection.nominalScale()).get(band);
}

exports.getCollectionSize = function(collection){
  return collection.size();
};

exports.getPontosFixosBacia = function(){
  var featureCollection = ee.FeatureCollection("users/nitaguapti-macrofitas/pontos-fixos");
  return featureCollection;
};