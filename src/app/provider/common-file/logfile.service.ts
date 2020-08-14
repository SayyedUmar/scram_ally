import { Injectable } from '@angular/core';
import { FilesystemDirectory, FilesystemEncoding, Plugins } from '@capacitor/core';
import * as moment from 'moment';


const { Filesystem, CustomNativePlugin } = Plugins;


@Injectable({
  providedIn: 'root',
})
export class LogfileService {
  filename: any;
  constructor() {
  }
  // Tag Name = Class name, Method Name, Message , For Logging messages in app
  logInfo(className: string, methodName: string, message: string) {
    // console.log('logInfo ' + ' : Class Name:  ' + className + ', Method: ' + methodName + ', ' + message);
    this.fileLogging('logInfo', className, methodName, message, this.filename);
  }

  logError(className: string, methodName: string, message: string) {
    // console.log('logError ' + ' : Class Name:  ' + className + ', Method: ' + methodName + ', ' + message);
    this.fileLogging('logError', className, methodName, message, this.filename);
  }

  logWarning(className: string, methodName: string, message: string) {
    // console.log('logWarning ' + ' : Class Name:  ' + className + ', Method: ' + methodName + ', ' + message);
    this.fileLogging('logWarning', className, methodName, message, this.filename);
  }

  logDebug(className: string, methodName: string, message: string) {
    // console.log('logDebug ' + ' : Class Name:  ' + className + ', Method: ' + methodName + ', ' + message);  
    this.fileLogging('logDebug', className, methodName, message, this.filename);
  }

  private async fileLogging(tag: string, className: string, methodName: string, jsonData: string, filenameWithExtension: string) {
    var message = 'Class Name: ' + className + ', Method:' + methodName + ', ' + jsonData.substr(0);

    switch (tag) {
      case 'logInfo':
        CustomNativePlugin.LogInfo({ 'tag': tag, 'message': message })
        break;
      case 'logDebug':
        CustomNativePlugin.LogDebug({ 'tag': tag, 'message': message })
        break;
      case 'logWarning':
        CustomNativePlugin.LogWarning({ 'tag': tag, 'message': message })
        break;
      case 'logError':
        CustomNativePlugin.LogError({ 'tag': tag, 'message': message })
        break;
      default:
        CustomNativePlugin.LogInfo({ 'tag': tag, 'message': message })
        break;
    }
  }

}
