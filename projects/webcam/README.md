# WebcamLibrary

This is a simple angular 7.1.2 application for webcam which will work in IE11 as well with help of Flash(With Webcam.js support).

## Features
* Webcam live view
* Photo capturing
* Smartphone compatibility

## Usage
This Section will describe how to use this library in your application.

1) Install the library using npm command:

      `npm install --save ngx-camera`

2) Import `WebcamModule` in your module

    ```
        import {WebcamModule} from 'ngx-camera';

        @NgModule({
        imports: [
            WebcamModule,
            ...
        ],
        ...
        })
        export class AppModule { }

    ```

3) Now use `WebcamComponent` in your component/page.

    `<ngx-camera [width]="640" [height]="480" (imageCaptured)="imageCaptured($event)"></ngx-camera>`

## Options
This section describes the basic inputs/outputs of the component and all inputs are optional.

### Inputs

* `width: number`: The maximal video width of the webcam live view.
* `height: number`: The maximal video height of the webcam live view.
* `imageType: string = 'image/png'`: indicate the image format. The default format type is image/png. 

### Outputs

* `imageCaptured:EventEmitter<any>`: Whenever image is captured this event will gives the output base64 string.

## License

MIT

## Development
Here you can find instructions on how to start developing this library.

### Start

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build webcam` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
