# NetWatch Pro Frontend


This repository is a place for the NetWatch Pro frontend application team to work on
the frontend changes and features, and to solicit and accept
[feedback and requests](https://github.com/gpapadopp/netwatch-pro-frontend/issues).

# NetWatch Pro Frontend Team

As of July 2024, the NetWatch Pro frontend team consists of:

* George Papadopoulos ([@gpapadopp](https://github.com/gpapadopp)), Software Engineer

## Contributing

Anyone can participate in the discussion about Frontend changes
by adding issues in this repository,
by replying to issues in this repository,
and by uploading documents, tests or other resources.

When commenting on issues in this repository, keep in mind:

-   :+1: reactions are more useful than comments to show support.
-   Motivating examples help us understand why you want new features more than
    pointers to other examples which have them. We love hearing feedback about
    your experiences with other Frontends, but we also want to know why they are
    right for this project in particular.

## License & patents

See [LICENSE][license].

## Project Build

Either you can just clone the latest built Docker imager from the [Repository's Packages][packages],
or you can create a new Docker build based on the [Dockerfile][docker_file] located in the project's root directory.
The default listening IP address and port mapping is 127.0.0.1:3000.

## Pre-requirements

In order to use this Frontend, you have to install [NodeJS][node_js_site] to your local node.
Also, in order for the Frontend to display some data, you have to run the
[NetWatch Pro API Backend Application][netwatch_pro_api_backend].
Any changes made in the [application's config file][application_config_file] requires a new Docker build.

## Run

To run this Frontend you just have to run the equivalent Docker build.
Automatically the Docker build will start the application and expose the port 3000 (application's default).
Then your application is ready to use. You can either access it via your local node's IP address and port mapping (http://127.0.0.1:3000),
or by implementing a [Reverse-Proxy Technique][reverse_proxy_technique_site] to your domain or public IP address.

[license]: https://github.com/gpapadopp/netwatch-pro-frontend/blob/main/LICENSE
[packages]: https://github.com/gpapadopp/netwatch-pro-frontend/pkgs/container/netwatch-pro-frontend
[docker_file]: https://github.com/gpapadopp/netwatch-pro-frontend/blob/main/Dockerfile
[node_js_site]: https://nodejs.org/en
[application_config_file]: https://github.com/gpapadopp/netwatch-pro-frontend/blob/main/next.config.mjs
[reverse_proxy_technique_site]: https://en.wikipedia.org/wiki/Reverse_proxy
[netwatch_pro_api_backend]: https://github.com/gpapadopp/netwatch-pro-api
