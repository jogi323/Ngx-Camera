import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import * as Webcam from '../assets/js/webcam.js';

@Component({
  selector: 'ngx-camera',
  template: `
    <div class="photo-capture center-content">
      <div class="col-12 col-12">
        <div id="my_camera" [ngClass]="{'camera-alignment': isIE}" style="text-align: center;">
          <div *ngIf="isIE">
            <video #my_camera id="my_camera" width="{{width}}" height="{{height}}" autoplay></video>
            <canvas #ieCanvas id="canvas" width="{{width}}" height="{{height}}" style="display:none;"></canvas>
          </div>
          <div *ngIf="!isIE">
            <video #video id="video" width="{{width}}" height="{{height}}" autoplay></video>
            <canvas #canvas id="canvas" width="{{width}}" height="{{height}}" style="display:none;"></canvas>
          </div>
        </div>
        <button *ngIf="enableCamera" id="capture" class="capture-clean" (click)="capture()" title="Capture Picture"> Take a picture
          <!--<img class="img-responsive" src="assets/images/camera.svg" alt="camera capture icon" />-->
        </button>
        <!--<button class="toggle-camera">Toggle camera on/off</button>-->
        <div class="captured-image" *ngIf="resultBase64">
          <div class="text-center">
            <h2>Nice!!</h2>
            <img [src]="resultBase64" width="640" height="480">
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.capture-clean{
      position: relative;
      left: 48%;
      background: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      cursor: pointer;
  }
  .captured-image {
    margin-top: 20px;
    text-align: center;
  }
  .camera-alignment {
    position: relative;
    left: 25%;
  }
  `
  ]
})
export class WebcamComponent implements OnInit, AfterViewInit, OnDestroy {
  private default_image_type = 'image/png';

  @Input() width: any;
  @Input() height: any;
  @Output() imageCaptured =  new EventEmitter();
  @Input() imageType: string = this.default_image_type;

  @ViewChild('video')
  public video: ElementRef;
  @ViewChild('my_camera')
  public myCamera: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  @ViewChild('ieCanvas')
  public ieCanvas: ElementRef;
  public isIE: boolean;
  public currentCameraDevice: any;
  public enableCamera = true;
  public resultBase64: string;

  constructor() { }

  ngOnInit() {
    this.isIE = navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? false : true;
    this.width = this.width ? this.width : 640;
    this.height = this.height ? this.height : 480;
  }

  ngAfterViewInit() {
    if (!this.isIE) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    } else {
      this.attachCamera();
    }
  }
  public attachCamera() {
    console.log(this.imageType.split('/')[1]);
    Webcam.set({
      width: this.width,
      height: this.height,
      image_format: this.imageType.split('/')[1],
      jpeg_quality: 90,
      enable_flash: true,
      constraints: { optional: [{ sourceId: this.currentCameraDevice }] }
     });
     Webcam.attach('#my_camera');
  }

  public capture() {
    if (!this.isIE) {
    const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, this.width, this.height);
    // this.enableCamera = false;
    // this.video.nativeElement.style.display = 'none';
    this.resultBase64 = this.canvas.nativeElement.toDataURL(this.imageType);
    this.imageCaptured.emit(this.resultBase64);
    } else {
      Webcam.snap(data_uri => {
        if (data_uri !== 'data:,') {
          // this.enableCamera = false;
          // this.myCamera.nativeElement.style.display = 'none';
          this.resultBase64 = data_uri;
          this.imageCaptured.emit(this.resultBase64);
          // Webcam.reset();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.video && this.video.nativeElement.srcObject) {
      const tracks = this.video.nativeElement.srcObject.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
      this.video.nativeElement.srcObject = null;
    }
    if (Webcam) {
      Webcam.reset();
    }
  }
}
