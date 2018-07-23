/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var address = "";
var a = 0;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        ble.scan([], 8, function(device) {
            // console.log(JSON.stringify(device));
            if (device.id === 'C0:26:DF:00:AA:F2') {
                address = device.id;
                ble.autoConnect(device.id, connected, done);
            }
        }, done);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};

app.initialize();

function done (data) {
    console.log(JSON.stringify(data));
}

function connected (data) {
    console.log("connected");
    //ble.startNotification(address, "1808", "2A18", done, done);
    //ble.startNotification(address, "1808", "2A52", startAccess, done);
    sequence();
    // var name = "TAIDOC 4279 0";
    // var enc = btoa(name)
    // ble.write(address, "1800", "2A00", name, writeSuccess, writeFailure);
    // var byte = [2];
    // byte[0] = btoa(0x01);
    // byte[1] = btoa(0x01);
    // console.log(byte);
}

function writeSuccess (data) {
    console.log("write success"+ data);
}

function writeFailure (data) {
    console.log(data);
    console.log("write failure");
}

function sequence () {
    ble.startNotification(address, "1808", "2A18", startNotificationSuccess, done);
    window.setTimeout(sequence2, 5000);
}

function sequence2 () {
    ble.startNotification(address, "1808", "2A52", startNotificationSuccess, done);
    window.setTimeout(sequence3, 10000);
}

function startNotificationSuccess (data) {
    console.log("New notification: "+ data);
}

function sequence3 () {
    var byte = new Uint8Array(1)
    byte[0] = 0x0101;
    // byte[0] = btoa(byte[0]);
    // byte[1] = btoa(byte[1]);
    console.log(byte);
    ble.write(address, "1808", "2A52", byte.buffer, writeSuccess, writeFailure);
}