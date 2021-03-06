'use strict'

/*
|-----------------------------------------------------------------------------
| Web Socket
|-----------------------------------------------------------------------------
|
| WebSocket provider makes it so simple for you to write realtime applications
| with the power of channels and dynamic rooms. Make use of this file to
| define channels and bind controllers next to them.
|
|
| @example
| Ws.channel('/chat', 'ChatController')
*/

const Ws = use('Ws')

Ws.channel('market', 'MarketDataController')
Ws.channel('eth', 'MarketDataController')
Ws.channel('chat', 'ChatController')
Ws.channel('bidsocket','BidSocketController')
Ws.channel('asksocket','AskSocketController')
