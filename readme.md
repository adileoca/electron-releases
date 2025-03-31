building without signing: add identity like this:

 "mac": {
      "target": [
        {
          "target": "dmg",
          "arch": [
            "x64",
            "arm64"
          ]
        },
        {
          "target": "zip",
          "arch": [
            "x64",
            "arm64"
          ]
        }
      ],
      "identity": null
    },


    to package.json
