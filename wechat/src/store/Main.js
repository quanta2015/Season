import { observable, action, runInAction } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import fileToBlobScaled from 'util/fileToBlobScaled'

class Main extends BaseActions {


  @action
  async getUnionInfo() {
    return await this.post(urls.API_UNION_INFO_LOAD, null)
  }
  @action
  async saveUnionInfo(params) {
    return await this.post(urls.API_UNION_INFO_SAVE, params)
  }

  @action
  async getProject() {
    return await this.post(urls.API_PROJECT_LOAD, null)
  }
  @action
  async saveProject(params) {
    return await this.post(urls.API_PROJECT_SAVE, params)
  }

  @action
  async getAct() {
    return await this.post(urls.API_ACT_LOAD, null)
  }
  @action
  async delAct(params) {
    return await this.post(urls.API_ACT_DEL, params)
  }


  

  @action
  async getQues() {
    return await this.post(urls.API_QUES_LOAD, null)
  }
  @action
  async saveQues(params) {
    return await this.post(urls.API_QUES_SAVE, params)
  }
  
  @action
  async saveMsg(params) {
    return await this.post(urls.API_MSG_SAVE, params)
  }

  @action
  async getMsgs() {
    return await this.post(urls.API_MSGS_LOAD, null)
  }
  @action
  async saveMsgs(params) {
    return await this.post(urls.API_MSGS_SAVE, params)
  }


  @action
  async uploadImg(file) {
    const blob = await fileToBlobScaled(file, 600, 600, 0.5)
    let formData = new FormData()
    formData.append('file', blob)
    let r = await this.post(urls.API_UPLOAD_IMG, formData)
    return r
  }

  @action
  async addAct(params) {
    return await this.post(urls.API_ACT_ADD, params)
  }
  

}

 



export default new Main()
