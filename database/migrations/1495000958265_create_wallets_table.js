'use strict'

const Schema = use('Schema')

class WalletTableSchema extends Schema {

  // {"status":"ok",
  //  "data":{
  //    "wallet":{
  //       "uuid":"100b6807-a39a-42db-86b3-52aa4ff1ba5c",
  //       "type":"TRACTO",
  //       "username":"hisham",
  //       "address":"TvyZ4eSRCAk2o1jH6VHunK6XmDXALvusgKGbU2kb9rMae3RZg9n3vjyFNYekyeKHMWDbrrQuL7MPpAUNm73MLpbL2A8u2Cydi",
  //       "pin":"Ez218jPCS79WYVdie34J4UiWyL33sK7wLZymGYWD9vDG",
  //       "mnemonics":"start claim tenant worth clarify orange fiction sand dash task ginger toast",
  //       "created_at":"2017-05-17T05:55:13Z",
  //       "updated_at":"2017-05-17T05:55:13Z"
  //     }
  //   }
  // }

  up () {
    this.create('wallets', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('uuid', 80).notNullable().unique()
      table.string('type', 20).notNullable()
      table.string('username', 40).notNullable()
      table.string('address', 120).notNullable().unique()
      table.string('pin', 50).notNullable()
      table.string('mnemonics', 150).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('wallets')
  }

}

module.exports = WalletTableSchema
