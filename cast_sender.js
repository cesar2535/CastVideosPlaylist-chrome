(function() {
  'use strict';

  var DEVICE_STATE = {
    'IDLE': 0,
    'ACTIVE': 1,
    'WARNING': 2,
    'ERROR': 3
  };

  var PLAYER_STATE = {
    'IDLE': 'IDLE',
    'LOADING': 'LOADING',
    'LOADED': 'LOADED',
    'PLAYING': 'PLAYING',
    'PAUSED': 'PAUSED',
    'STOPPED': 'STOPPED',
    'SEEKING': 'SEEKING',
    'ERROR': 'ERROR'
  };
  
  var CastPlayer = function() {
    this.deviceState = DEVICE_STATE.IDLE;
    this.receiver_availabe = false;

  };

  CastPlayer.prototype.initializeCastApi = function() {
    if (!chrome.cast || !chrome.cast.isAvailable)
      setTimeout(this.initializeCastApi.bind(this), 1000);

    var appID = 'C8207ABF';
    var sessionReqest = new chrome.cast.SessionRequest(appID);
    var apiConfig = new chrome.cast.ApiConfig(sessionReqest, this.sessionListener.bind(this), this.receiverListener.bind(this));
    chrome.cast.initialize(apiConfig, this.onInitSuccess.bind(this), this.onError.bind(this));
  };

  CastPlayer.prototype.sessionListener = function(e) {

  };

  CastPlayer.prototype.receiverListener = function(e) {
    if (e === 'available') {
      this.receiver_availabe = true;
      console.log(chrome.cast.ReceiverAvailability);
      console.log('receiver found');
    }
  };

  CastPlayer.prototype.onInitSuccess = function() {
    console.log('Initial success');
  };

  CastPlayer.prototype.onError = function() {
    console.error(this);
  };

})();