# NearbyMe
Ludium Collegium 2023-09 Contest

---
## summary
this is Proof of Concept.

NearbyMe is a **"concept"** mobile application that allows users to find other user beside them.

Original idea is identifying users by bluetooth beacon advertisement backed by mobile app.

This PoC is just mocking up the idea by web api. 

## installation
### pre-requirement
- node 18 with was (e.g. apache, nginx)
- redis-server (for storage)
- https certificate

### running backend
```bash
git clone git@github.com:jaeil-wiki/collegium-nearbyme.git
cd collegium-nearbyme
npm install
npm run build
npm run start
```
... api backend will be running on port 3000

### deploying frontend
- you can fork source code [here](https://jutsu.ai/search/58423e7fe4bbc6956ea637d23cbeedee8ec23873fcd93bafb69086af625563e9/widget/NearbyMe)
- or you can see the code in this repository `bos_frontend.js`
- *you have to change `apiHost` and `deployerAccountId` in the source code to your own.

### [live demo](https://near.social/58423e7fe4bbc6956ea637d23cbeedee8ec23873fcd93bafb69086af625563e9/widget/NearbyMe?place=1)