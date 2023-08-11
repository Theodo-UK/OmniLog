# OmniLog testing

## Dev
To use the OmniLog package, you only need to copy the `sdk-python/src/omnilog` folder into the `example` folder.
Your directory should look like this:
```
.
├── README.md
├── .env
├── .gitignore
├── example.env
├── llm
│   └── get_openai_response.py
├── main.py
└── omnilog
    ├── __init__.py
    ├── connect_to_db.py
    └── write_data.py
```

## Prod
For the time being, using the OmniLog package in production requires a manual install.
1. Download the OmniLog zip file
2. Unpack the file to the root of your project as `omnilog`

That's all!
