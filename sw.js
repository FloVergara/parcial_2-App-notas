const cacheName = 'cache_notas';

self.addEventListener('install', function(e){
    console.log(e);
    const cache = caches.open(cacheName).then (cache => {
        return cache.addAll([
            '/',
            'index.html',
            'app.js',
            'css/styles.css',
            'sw.js',
        ])
    })

    e.waitUntil( cache );
})

self.addEventListener( 'fetch', e => {
    const resCache = fetch ( e.request).then( res => { // si hay conexion
        //actualizo el caché con lo nuevo que hay en la web
            return caches.open( cacheName ).then( cache =>{
                cache.put( e.request, res.clone() );
                return res;
            })
        }).catch( error => { // si falla la conexion, buscar en el cache
            console.log( error );
            return caches.match( e.request);
        })
        e.respondWith(resCache);
    })