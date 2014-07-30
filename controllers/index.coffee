config = require '../utils/getConfig'

root = (exports ? this)

root.test = 
  (req, res) ->
    res.send 'test'

root.intro = 
  (req, res) ->
    res.sendfile 'public/intro.html'

root.console = 
  (req, res) ->
    t = 
      data: config
      title: "see"

    res.render 'console', t

root.submit =
  (req, res) ->
    #update the config.json
    res.send('success')

root.sync =
  (req, res) ->
    #sync the config.json
    res.send('suceess')







