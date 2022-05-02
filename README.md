# MacroApp

This is the workspace that contains the relationship between the Host and the micro-frontends.

~~~
Generating with:
$ ng new macro-app --createApplication=false
~~~

**Important**: Install Angular CLI.


~~~
$ npm install -g @angular/cli
~~~
or Yarn
~~~
$ yarn add global @angular/cli
~~~



## Host
This application will contain the microfrontends exposed by the federation module. 

~~~
Generating with:
$ ng g application <name> --style=css --routing=true
~~~

## Host
These are the small applications that will contain the project.

~~~
Generating with:
$ ng g application <name> --style=css
~~~


# ngModuleFederation Integration

There are two basic concepts for understanding microfrontends. There are only two types of applications; The host is the application that receives the microfrontends to expose them. The remote, is the application that exposes its components or modules so that they can be used in a host.

~~~
    $ ng add @angular-architects/module-federation --project <application_name> --port <number_port>
~~~


Automatically installs the ngModuleFederation packages and creates a webpack.config.js file where it can be configured for both host and microfrontends.

