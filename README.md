# node-red-contrib-sesame

node-red-contrib-sesameは[Sesame API](https://doc.candyhouse.co/ja/SesameAPI)を使用するためのNode-REDノードです。
Sesame3/4に対応しています。

## Sesameについて

Sesameは [CANDY HOUSE](https://jp.candyhouse.co) のスマートロックです。

## インストール

Node-REDのルートディレクトリーにて、以下のようにインストールしてください。

```sh
npm install node-red-contrib-sesame
```

## 初期設定

1. [Sesame ダッシュボード](https://dash.candyhouse.co/)へログインし、API KEYを生成してください。
1. `セサミ、ひらけゴマ ! アプリ` にて、操作対象の鍵のUUIDを取得してください。
1. 「このセサミの鍵をシェア」からQRコードを表示し、秘密鍵を取得してください。
1. 上記手順に従って、node-red-contrib-sesameをインストールしてください。
    * インストール後、パレットの「IoT」カテゴリーにSesameノードが追加されます。
1. 追加されたSesameノードをワークスペースにドラッグします。
1. ドラッグしたSesameノードをダブルクリックします。
1. 1.〜3. にて取得したAPI KEY, UUID, 秘密鍵を設定してください。

## 鍵操作

操作データーを以下のようなJSONフォーマットにしてmsg.payloadにセットし、Sesameノードに送信してください。

### 施錠

```javascript
{"user":履歴に表示する文字列, "cmd":"lock"}
```

### 解錠

```javascript
{"user":履歴に表示する文字列, "cmd":"unlock"}
```

### トグル

```javascript
{"user":履歴に表示する文字列, "cmd":"toggle"}
```