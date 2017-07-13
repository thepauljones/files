module['exports'] = function integration(hook) {

  // hook.io has a range of node modules available - see
  // https://hook.io/modules.
  // We use request (https://www.npmjs.com/package/request) for an easy way to
  // make the HTTP request.
  var request = require('request');

  // The parameters passed in via the slash command POST request.
  var params = hook.params;

  // Check that the hook has been triggered from our slash command by
  // matching the token against the one in our environment variables.
  if(params.token === hook.env.custom_token) {

    // Set up the options for the HTTP request.
    var options = {
      uri : 'http://www.nothing.com',
      method: 'POST'
    };

    // Make the POST request to the Slack incoming webhook.
    request(options, function (error, response, body) {

      // Pass error back to client if request endpoint can't be reached.
      if (error) {
        hook.res.end(error.message);
      }

      hook.res.writeHead(200, {
        'Content-Type':'application/json'
      });

      var output = {};
      // params.text is how you get to the param that's passed
      var linkWithparam = hook.env.custom_env_var_url + params.text;
      output.text = '';

      output.attachments = [];

      var attachment = {};
      attachment.color = "#764FA5";
      attachment.image_url = '';
      attachment.text = "<" + linkWithparam + "|" + linkWithparam + ">";
      attachment.pretext = 'Text before output here';
      attachment.username = 'Paul Jones';

      output.attachments.push(attachment);

      // Finally, send the response. This will be displayed to the user after
      // they submit the slash command.
      hook.res.end(JSON.stringify(output));
    });

  } else {

    // If the token didn't match, send a response anyway for debugging.
    hook.res.end(params.token + ' ' + hook.env.custom_token + ' Incorrect token.');
  }
};
