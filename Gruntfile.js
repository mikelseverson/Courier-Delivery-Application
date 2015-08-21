module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            },
            controllers: {
                src: "client/scripts/controllers/controller.js",
                dest: "server/public/assets/scripts/controllers/controller.min.js"
            }
        },
        copy: {
            angular: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularRoutes: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular-route/angular-route.min.js",
                    "angular-route/angular-route.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularAria: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular-aria/angular-aria.min.js",
                    "angular-aria/angular-aria.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularMaterial: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular-material/angular-material.min.css",
                    "angular-material/angular-material.min.js"
                ],
                "dest": "server/public/vendors/"
            },
            angularAnimate: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular-animate/angular-animate.min.js",
                    "angular-animate/angular-animate.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            style: {
                expand: true,
                cwd: 'client',
                src: [
                    "styles/*"
                ],
                "dest": "server/public/assets"
            },
            assets: {
                expand: true,
                cwd: 'client',
                src: [
                    "images/*"
                ],
                "dest": "server/public/assets"
            },
            views: {
                expand: true,
                cwd: 'client',
                src: [
                    "views/*"
                ],
                "dest": "server/public/assets"
            },
            htmlRoutes: {
                expand: true,
                cwd: 'client/',
                src: [
                    "views/routes/*"
                ],
                "dest": "server/public/assets"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};