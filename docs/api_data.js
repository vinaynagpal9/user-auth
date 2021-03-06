define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login [POST]",
    "group": "Authentication",
    "description": "<p>This api is used by login the user using email and password.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email Id of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"success\": Boolean,\n   \"message\": \"Enjoy your token !!\",\n   \"token\": \"JWT Token\",\n   \"id\": \"User Id\",\n   \"role\": \"User Role\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response 403:",
          "content": "HTTP/1.1 403 Unable to login.\n{\n  \"message\": \"Unable to login\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 500:",
          "content": "HTTP/1.1 500 Error on server side.\n{\n  \"message\": \"Something went wrong\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "auth-manager/routes/userRoutes.js",
    "groupTitle": "Authentication",
    "name": "PostLogin"
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "Signup [POST]",
    "group": "Authentication",
    "description": "<p>This api is used by signup the user using email.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email Id of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>Mobile of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role of the user [&quot;USER&quot;, &quot;RECRUITER&quot;].</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n   \"success\": Boolean,\n   \"message\": \"Enjoy your token !!\",\n   \"token\": \"JWT Token\",\n   \"id\": \"User Id\",\n   \"role\": \"User Role\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response 403:",
          "content": "HTTP/1.1 403 Unable to signup.\n{\n  \"message\": \"Unable to signup\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 500:",
          "content": "HTTP/1.1 500 Error on server side.\n{\n  \"message\": \"Something went wrong\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "auth-manager/routes/userRoutes.js",
    "groupTitle": "Authentication",
    "name": "PostSignup"
  }
] });
