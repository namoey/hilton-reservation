import { Response, Request } from "express"

const prometheus = require('prom-client')
/*const register = new Prometheus.Registry()
register.setDefaultLabels({
    app: 'hilton-reservation-server'
})*/
//Prometheus.collectDefaultMetrics({ register })

const histogram = new prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['route', 'code', 'method'],
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
  });

const getMetrics = async(req: Request, res: Response): Promise<void> => {
    res.set('Content-Type', prometheus.register.contentType)
    res.end(await prometheus.register.metrics())
}

//register.registerMetric(histogram)
export { prometheus, histogram, getMetrics }