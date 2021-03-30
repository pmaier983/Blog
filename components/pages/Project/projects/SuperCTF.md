---
title: SuperCTF.com
description: A Game I built the backend for.
publishTime: 18-3-2021
modifiedTime: 18-3-2021
authors:
  - Phillip Maier
tags:
  - TypeScript
  - React
  - Express
  - Restful
  - mYSQL
projectURL: https://superctf.com/
bannerPath: /PostBackgrounds/SuperCTF.png
bannerPlaceholderPath: /PostBackgrounds/SuperCTF-Placeholder.png
bannerHeight: 160
bannerWidth: 180
bannerCredit: Carshall
bannerDescription: An image of players fighting over a flag
---

## ❓ Why Did I start working on [SuperCTF.com](https://superctf.com/)

I have a deep love of IO games. I think they fill a difficult niche: You can enjoy them as a game, feel a competitive drive, and avoid severe addiction. Well... most of the time you wont get overly addicted.

I started assisting in the development of [SuperCTF.com](https://superctf.com/) after I went on a two or three day binge and got several characters into the top 10. There is a chance they are still there even after I post this... look for anyone with the name PEDM.

After chatting with Carshall (the founder), I saw joining the team as a great opportunity to get my hands dirty with backend development, specifically in the realm of SQL & webSockets.

## 🏗️ How Did I build [SuperCTF.com](https://superctf.com/)

Just to be entirely clear, this was a team effort. In total there are four of us: Carshall (fullStack), Me (fullStack no Godot), JamJar (Godot), Teho (Art).

A partial list of my efforts/accomplishments can be seen below:

- vanilla http connections -> connection pooling
- no file structure (one 3000 line file) -> structured reusable routes
- Added Error logging
- Javascript -> Typescript
- Callback hell -> Async/await
- Godot frontend -> React (react-query) frontend
- and much more!

The API is a Typescript Express API with a MySQL backend and the Frontend is a React frontend powered by react-query and a couple other libraries.

Now if you're wondering how exactly the game is built... I couldn't say much. I can only shed light on the landing page and API, the game in created in Godot (similar to C++) and compiled into a wasm file that I copy and paste into our frontend repo.

## 💡 What Are my takeaways from building [SuperCTF.com](https://superctf.com/)
