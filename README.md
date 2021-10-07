# node-red-contrib-sesame

## Sesame
SesameはCANDY HOUSE のスマートロックです。

node-red-contrib-sesameは[Sesame API](https://doc.candyhouse.co/ja/SesameAPI)を使用するためのNode-REDノードです。
Sesame3/4に対応しています。

## インストール

Node-REDのルートディレクトリーで次のようにインストールしてください。

```sh
$ npm install node-red-contrib-sesame
```

## 事前準備

1. 事前に[Sesame ダッシュボード](https://dash.candyhouse.co/)にログインし、API KEYを生成してください。
1. Sesame 3アプリで操作対象の鍵のUUIDを取得。
1. 「このセサミの鍵をシェア」からQRコードを表示し、秘密鍵を取得。

## 使い方
sesameノードをNode-REDにインストールすると、パレットの「IoT」カテゴリーにsesameノードが追加されます。

ノードをワークスペースにドラッグし、ダブルクリックして、API KEY, UUID, 秘密鍵を設定してください。

## 鍵操作

操作データーを以下のようなJSONフォーマットにしてmsg.payloadにセットし、sesameノードに送信してください。

施錠：
```javascript
{"user":履歴に表示する文字列, "cmd":"lock"}
```
解錠：
```javascript
{"user":履歴に表示する文字列, "cmd":"unlock"}
```
トグル：
```javascript
{"user":履歴に表示する文字列, "cmd":"toggle"}
```