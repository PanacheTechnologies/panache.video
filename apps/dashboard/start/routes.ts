/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('product')
router.on('/pricing').renderInertia('pricing')

const ProcessVideoController = () => import('#controllers/process-video-controller')
router.post('/process-video', [ProcessVideoController, 'handle'])
