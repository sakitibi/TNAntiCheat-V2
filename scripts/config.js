/*
  punishment: ban | kick | tempkick | notify | none
*/

// configVersion: 8
export default /** @type {import('./types').IConfig} */ ({
  permission: {
    admin: { // 全ての検知から除外される権限
      encrypt: true, // タグを難読化して不正に権限を取られにくくする
      tag: "ac:admin", // encryptがtrueの場合は使わない
      players: [],
      ids: []
    },
    builder: { // クリエイティブが許可される権限
      encrypt: true,
      tag: "ac:builder",
      players: [],
      ids: []
    },
    ban: {
      encrypt: false,
      tag: "ac:kick", // banするタグです
      players: [NMNGyuri], // banするプレイヤーの名前
      ids: [], // banするプレイヤーのuniqueID
      xuids: [] // banするプレイヤーのxuid
      // xuidでbanとは: https://twitter.com/tutinoko_kusaa/status/1587356291734773760
    }
  },
  command: {
    prefix: "!",
    
    /** (試験的) Bedrock Serverのコンソールからscriptevent経由でのコマンドの実行を許可します */
    enableConsole: false
  },
  itemList: {
    ban: [
      "minecraft:movingBlock",
      "minecraft:movingblock",
      "minecraft:moving_block"
    ],
    kick: [
      "minecraft:lava",
      "minecraft:water",
      "minecraft:flowing_lava",
      "minecraft:flowing_water",
      "minecraft:invisiblebedrock",
      "minecraft:invisible_bedrock"
    ],
    notify: [
      "minecraft:beehive",
      "minecraft:bee_nest",
      "minecraft:lava_bucket",
      "minecraft:axolotl_bucket",
      "minecraft:cod_bucket",
      "minecraft:pufferfish_bucket",
      "minecraft:salmon_bucket",
      "minecraft:tropical_fish_bucket",
      "minecraft:tadpole_bucket",
      "minecraft:respawn_anchor",
      "minecraft:tnt",
      "minecraft:bedrock",
      "minecraft:barrier",
      "minecraft:unknown",
      "minecraft:info_update",
      "minecraft:info_update2",
      "minecraft:reserved6"
    ]
  },
  nuker: {
    state: true,
    limit: 8, // 1tickに何ブロックの破壊で検知するか(ラグも考慮)
    cancel: true, // 壊されたブロックを置き直す
    punishment: "kick"
  },
  namespoof: {
    state: true,
    maxLength: 20, // 指定した値より長い名前を検知
    punishment: "kick"
  },
  spammerA: { // チャットの長さをチェック
    state: true,
    maxLength: 100,
    autoMuteCount: 10, // 自動でミュートされるまでの検知数(-1で無制限)
    tempMute: true // 一時的なミュートにするか (リログで消えます)
  },
  spammerB: { // 重複するチャットを制限
    state: true,
    autoMuteCount: 30,
    tempMute: true
  },
  spammerC: { // チャットの速さをチェック
    state: true,
    minInterval: 1500, // ミリ秒で指定 1000ms = 1s
    autoMuteCount: 20,
    tempMute: true
  },
  instaBreak: { // 壊せないブロックの破壊を検知
    state: true,
    punishment: "kick",
    cancel: true,
    detect: [
      "minecraft:bedrock",
      "minecraft:barrier",
      "minecraft:command_block",
      "minecraft:repeating_command_block",
      "minecraft:chain_command_block",
      "minecraft:deny",
      "minecraft:allow",
      "minecraft:border_block",
      "minecraft:light_block",
      "minecraft:end_portal",
      "minecraft:end_gateway",
      "minecraft:portal",
      "minecraft:end_portal_frame"
    ]
  },
  itemCheckA: { // 持っていたら検知 アイテムはitemList参照
    state: true,
    notifyCreative: true, // クリエの人は削除だけしてbanやkickはしない
  },
  itemCheckB: { // スポーンエッグを持っていたら検知
    state: true,
    punishment: "notify"
  },
  itemCheckC: { // 最大の個数より大きい数を持っていたら検知
    state: true,
    punishment: "notify"
  },
  itemCheckD: { // 不正なエンチャントレベルを検知
    state: true,
    mode: "hand", // inventory: 全インベントリをチェックするから負荷大きめ, hand: 手持ちだけ検知だからまだまし
    punishment: "notify",
    clearItem: false
  },
  itemCheckE: { // エンチャント不可能なアイテムにエンチャントがついていたら検知
    state: true,
    punishment: "notify",
    clearItem: true
  },
  placeCheckA: { // 置いたら検知 アイテムはitemList参照
    state: true,
    notifyCreative: true, // クリエの人は削除だけしてbanやkickはしない
  },
  placeCheckB: { // 置いたときに中身をチェック アイテムはitemList参照
    state: true,
    punishment: "kick",
    flagCount: 5,
    spawnEgg: true,
    shulkerBox: true,
    detect: [
      "minecraft:chest",
      "minecraft:trapped_chest",
      "minecraft:hopper",
      "minecraft:dropper",
      "minecraft:dispenser",
      "minecraft:barrel",
      "minecraft:jukebox",
      "minecraft:smoker",
      "minecraft:lit_smoker",
      "minecraft:furnace",
      "minecraft:lit_furnace",
      "minecraft:blast_furnace",
      "minecraft:lit_blast_furnace",
      "minecraft:brewing_stand",
    ]
  },
  placeCheckC: { // 設置時に指定したブロックのデータをクリア
    state: true,
    excludeCreative: false,
    detect: [
      "minecraft:frame",
      "minecraft:glow_frame",
      "minecraft:campfire",
      "minecraft:soul_campfire",
      "minecraft:flower_pot",
      "minecraft:mob_spawner"
    ]
  },
  placeCheckD: { // 設置時に指定したエンティティのデータをクリア
    state: true,
    excludeCreative: false,
    minecarts: [ // レールの上限定
      "minecraft:hopper_minecart",
      "minecraft:chest_minecart"
    ],
    boats: [
      "minecraft:chest_boat",
      "minecraft:acacia_chest_boat",
      "minecraft:birch_chest_boat",
      "minecraft:cherry_chest_boat",
      "minecraft:dark_oak_chest_boat",
      "minecraft:jungle_chest_boat",
      "minecraft:mangrove_chest_boat",
      "minecraft:oak_chest_boat",
      "minecraft:spruce_chest_boat"
    ]
  },
  entityCheckA: { // いたらkill
    state: true,
    punishment: "notify",
    detect: [
      "minecraft:command_block_minecart",
      "minecraft:movingBlock",
      "minecraft:movingblock",
      "minecraft:moving_block",
      "minecraft:tnt",
      "minecraft:npc"
    ]
  },
  entityCheckB: { // ドロップ状態のアイテムを検知 アイテムはitemList参照
    state: true,
    spawnEgg: true, // スポーンエッグを含めるかどうか
    punishment: "notify"
  },
  entityCheckC: { // 1tickにスポーンできるエンティティの数
    state: true,
    maxArrowSpawns: 10, // 矢の数
    maxCmdMinecartSpawns: 3
  },
  entityCheckD: { // エンティティのインベントリの中をチェック
    state: true,
    spawnEgg: true,
    detect: [
      "minecraft:chest_minecart",
      "minecraft:hopper_minecart",
      "minecraft:chest_boat",
      "minecraft:mule"
    ]
  },
  entityCounter: { // 異常な数のエンティティを検知
    state: true,
    defaultCount: 300, // -1で無制限
    kill: false, // 設定値に達したときにkillする
    checkInterval: 200, // 数をチェックする間隔(tick)
    warnInterval: 1200, // 警告を表示する間隔(tick)
    detect: { // 個別設定
      // "entityId": [maxCount]
      "minecraft:item": 800
    }
  },
  reachA: { // 攻撃の長すぎるリーチを検知
    state: true,
    punishment: "notify",
    flagCount: 20,
    maxReach: 10,
    excludeCustomEntities: true, // バニラ以外のmobの検知を除外する
    excludeEntities: [ // 除外するエンティティ
      "minecraft:ender_dragon",
      "minecraft:enderman",
      "minecraft:ghast",
      "minecraft:fireball",
      "minecraft:snowball",
      "minecraft:shulker"
    ]
  },
  reachB: { // ブロック設置の長すぎるリーチを検知
    state: true,
    punishment: "notify",
    flagCount: 20,
    maxReach: 10,
    cancel: true, // ブロックの設置をキャンセル
  },
  reachC: { // ブロック破壊の長すぎるリーチを検知
    state: true,
    punishment: "notify",
    flagCount: 20,
    maxReach: 10,
    cancel: true, // ブロックの破壊をキャンセル
  },
  autoClicker: { // 連打ツールの使用を検知
    state: true,
    punishment: "notify",
    maxCPS: 25,
    flagCount: 20 // この回数以上検知されるとFlag (-1で無制限)
  },
  creative: { // クリエイティブになったら検知
    state: true,
    punishment: "notify",
    defaultGamemode: "adventure" // クリエを検知した時に設定するGamemode
  },
  speedA: { // 速すぎる移動を検知 (ベータ)
    state: true,
    punishment: "tempkick",
    flagCount: 20, // この回数以上検知されるとFlag (-1で無制限)
    maxVelocity: 2.2,
    rollback: true,
    excludeTag: "" // 検知から除外するタグ
  },
  // [1.21.20] 削除済み removed
  flyA: { // flyを検知 (ベータ)
    state: true,
    punishment: "tempkick",
    flagCount: 20, // この回数以上検知されるとFlag (-1で無制限)
    minFallDistance: -1.8,
    detectPiston: true, // ピストンで押された時の誤検知を減らす (負荷がかかる可能性あり)
    rollback: true,
    excludeTag: "" // 検知から除外するタグ
  },
  scaffold: {
    punishment: "tempkick",
    flagCount: 5,
    A: true,
    B: true,
    C: true,
    D: true,
    E: true,
    F: true,
    G: true,
    H: true,
    minBPS: 4,
    yDiff: 0.3,
    dDiff: 15,
    minSpeed: 0.18,
  },
  logger: {
    console: false, // 検知メッセージをコンテンツログに出力する
    maxLogs: 50, // 保存するログの数
    shortName: false, // メッセージ先頭 "TN-AntiCheat"の表示を"TN-AC"に変更
    sendws: false, // For discord-mcbe | メッセージをsayで出力
    
    // TNACからのメッセージ送信時にScriptEventにもメッセージを飛ばす
    // namespace:idの形で入力
    emitScriptEvent: ''
  },
  others: {
    adminPanel: "minecraft:stick", // 管理者用パネルを呼び出すためのアイテム
    debug: false,
    fixBDS: false, // Realmsで使う場合はオンにしてください
    blockCopy: true, // 管理者アイテムでブロックをスニーク+タップするとコピーできます
    timezoneOffset: +9, // 時刻表示用
    customKickMessage: "", // キック時に表示する追加のメッセージ
    
    tpsToScore: { // スコアボードにTPSを出力
      enabled: false,
      updateInterval: 20, // 更新する間隔(ticks)
      objective: "tps", // スコアのオブジェクト名
      name: "TPS" // スコアの名前
    }
  }
});
