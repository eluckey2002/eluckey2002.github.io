//works at 10:05 3/9
////@ts-check
import React from 'react'
import ReactDOM from 'react-dom'


class UserObjProps{
    CONSTRUCTOR(){
this.isCreated = true

    }
     isCreated= true
     UserIDProp = null
     UserRoleProp = null
     PositionProp = null
     DisplayNameProp = null
     AllProperties = null
   

 
   
     PrintUserObjProps()
    {
            
            this.UserIDProp = 'nothing'
            this. UserRoleProp = 'nothing'
            this.PositionProp = 'nothing'
            this.DisplayNameProp = 'nothing'
            this.AllProperties = 'nothing'

            console.log('user obj properties created')

    }


    setUserProperty(){

         //   this.user.setProperty('','{evanCustomSetting: 'hayyyy'}')


    }


}
class EvanPanel extends React.PureComponent {

    render(){


        return<>
        
        <div><h1>hiiii this is h1 evan</h1></div>
        
        </>
    }


}

export default class SendUserMessages extends BasePlugin {

    /** Plugin info */
    static get id()             { return 'EvanL All Message Types' }
    static get name()           { return 'EvanL All Message Types' }
    static get description()    { return 'Options for sending alert, popup, or toast message' }

    /** Called when the plugin is loaded */
     onLoad() {

    //    var btnToast = document.getElementById('btnSendToast')
    //    btnToast.addEventListener('onClick()', this.onToastPress())
        //Add constraint for facilitator or admin role

            console.log('loaded v2')

        // Allow message to be configured
 //       this.menus.register({
//            id: 'evanl-messages-toast',
//            section: 'infopanel',
 //          text: 'Toast',
//           icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c3ZnanM9Imh0dHA6Ly9zdmdqcy5jb20vc3ZnanMiIHZlcnNpb249IjEuMSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtNCAyM2g4YTEgMSAwIDAgMCAwLTJoLThhMS4wMDEzIDEuMDAxMyAwIDAgMSAtMS0xdi0xMi4yNTlsOS40ODgzIDUuNTM0OWEzLjEyMzUgMy4xMjM1IDAgMCAwIDMuMDIzNCAwbDkuNDg4My01LjUzNDl2Mi4yNTlhMSAxIDAgMCAwIDIgMHYtNGEzLjA1IDMuMDUgMCAwIDAgLTIuMzk3LTIuOTM4OCAyLjk5MzEgMi45OTMxIDAgMCAwIC0uNjAzLS4wNjEyaC0yMGEzLjA2MjIgMy4wNjIyIDAgMCAwIC0zIDN2MTRhMy4wMDMzIDMuMDAzMyAwIDAgMCAzIDN6bTAtMThoMjBhLjk4NzkuOTg3OSAwIDAgMSAuODUzNi41MTFsLTEwLjM1IDYuMDM3M2ExIDEgMCAwIDEgLTEuMDA3OCAwbC0xMC4zNDk0LTYuMDM3M2EuOTg3OS45ODc5IDAgMCAxIC44NTM2LS41MTF6IiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMjMgMTNhOCA4IDAgMSAwIDggOCA4LjAwOTIgOC4wMDkyIDAgMCAwIC04LTh6bTAgMTRhNiA2IDAgMSAxIDYtNiA2LjAwNjYgNi4wMDY2IDAgMCAxIC02IDZ6IiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PGNpcmNsZSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGN4PSIyMyIgY3k9IjI1IiByPSIxIiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMjMgMTZhMSAxIDAgMCAwIC0xIDF2NWExIDEgMCAwIDAgMiAwdi01YTEgMSAwIDAgMCAtMS0xeiIgZmlsbD0iI2NlY2VjZSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9IiIvPjwvZz48L3N2Zz4K',
 //          panel: { component: EvanPanel }
                          // {
            // @ts-ignore
          //  iframeURL: absolutePath('infopanel.html'),
         //   width: 400,
          //  height: 100
        //}
         
            
    //    })

        this.menus.register({
            id: 'evanl-messages-popup',
            section: 'admin-panel',
           text: 'Popup',
           icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c3ZnanM9Imh0dHA6Ly9zdmdqcy5jb20vc3ZnanMiIHZlcnNpb249IjEuMSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtNCAyM2g4YTEgMSAwIDAgMCAwLTJoLThhMS4wMDEzIDEuMDAxMyAwIDAgMSAtMS0xdi0xMi4yNTlsOS40ODgzIDUuNTM0OWEzLjEyMzUgMy4xMjM1IDAgMCAwIDMuMDIzNCAwbDkuNDg4My01LjUzNDl2Mi4yNTlhMSAxIDAgMCAwIDIgMHYtNGEzLjA1IDMuMDUgMCAwIDAgLTIuMzk3LTIuOTM4OCAyLjk5MzEgMi45OTMxIDAgMCAwIC0uNjAzLS4wNjEyaC0yMGEzLjA2MjIgMy4wNjIyIDAgMCAwIC0zIDN2MTRhMy4wMDMzIDMuMDAzMyAwIDAgMCAzIDN6bTAtMThoMjBhLjk4NzkuOTg3OSAwIDAgMSAuODUzNi41MTFsLTEwLjM1IDYuMDM3M2ExIDEgMCAwIDEgLTEuMDA3OCAwbC0xMC4zNDk0LTYuMDM3M2EuOTg3OS45ODc5IDAgMCAxIC44NTM2LS41MTF6IiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMjMgMTNhOCA4IDAgMSAwIDggOCA4LjAwOTIgOC4wMDkyIDAgMCAwIC04LTh6bTAgMTRhNiA2IDAgMSAxIDYtNiA2LjAwNjYgNi4wMDY2IDAgMCAxIC02IDZ6IiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PGNpcmNsZSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGN4PSIyMyIgY3k9IjI1IiByPSIxIiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMjMgMTZhMSAxIDAgMCAwIC0xIDF2NWExIDEgMCAwIDAgMiAwdi01YTEgMSAwIDAgMCAtMS0xeiIgZmlsbD0iI2NlY2VjZSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9IiIvPjwvZz48L3N2Zz4K',
           action: this.onPopupPress.bind(this)
        })

        // Allow message to be configured
        this.menus.register({
        id: 'evanl-messages-alert',
        section: 'admin-panel',
        text: 'Alert',
        icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c3ZnanM9Imh0dHA6Ly9zdmdqcy5jb20vc3ZnanMiIHZlcnNpb249IjEuMSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtNCAyM2g4YTEgMSAwIDAgMCAwLTJoLThhMS4wMDEzIDEuMDAxMyAwIDAgMSAtMS0xdi0xMi4yNTlsOS40ODgzIDUuNTM0OWEzLjEyMzUgMy4xMjM1IDAgMCAwIDMuMDIzNCAwbDkuNDg4My01LjUzNDl2Mi4yNTlhMSAxIDAgMCAwIDIgMHYtNGEzLjA1IDMuMDUgMCAwIDAgLTIuMzk3LTIuOTM4OCAyLjk5MzEgMi45OTMxIDAgMCAwIC0uNjAzLS4wNjEyaC0yMGEzLjA2MjIgMy4wNjIyIDAgMCAwIC0zIDN2MTRhMy4wMDMzIDMuMDAzMyAwIDAgMCAzIDN6bTAtMThoMjBhLjk4NzkuOTg3OSAwIDAgMSAuODUzNi41MTFsLTEwLjM1IDYuMDM3M2ExIDEgMCAwIDEgLTEuMDA3OCAwbC0xMC4zNDk0LTYuMDM3M2EuOTg3OS45ODc5IDAgMCAxIC44NTM2LS41MTF6IiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMjMgMTNhOCA4IDAgMSAwIDggOCA4LjAwOTIgOC4wMDkyIDAgMCAwIC04LTh6bTAgMTRhNiA2IDAgMSAxIDYtNiA2LjAwNjYgNi4wMDY2IDAgMCAxIC02IDZ6IiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PGNpcmNsZSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGN4PSIyMyIgY3k9IjI1IiByPSIxIiBmaWxsPSIjY2VjZWNlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIi8+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMjMgMTZhMSAxIDAgMCAwIC0xIDF2NWExIDEgMCAwIDAgMiAwdi01YTEgMSAwIDAgMCAtMS0xeiIgZmlsbD0iI2NlY2VjZSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9IiIvPjwvZz48L3N2Zz4K',
        action: this.onAlertPress.bind(this)
    
        })

        console.log("Finished loading all message types plugin.")

    }

   
  async onAlertPress()
    {
        const msg = await this.menus.prompt({
            title: 'Send an alert to all users',
            text: 'Enter the message you would like sent',
            inputType: 'textarea'
           })

        
           // No message to send
           if (!msg) { return }
            
           // Send message
         this.messages.send({ action: 'show-alert', text: msg }, true)

    }

    async onPopupPress()
    {

          // Ask user for message
          const msg = await this.menus.prompt({
            title: 'Display an iframe popup to users',
            text: 'Enter the full iframe url - make sure you have tested! Include http://',
            inputType: 'url'
        })
          // No message to send
          if (!msg) { return }

        
           // Send message
         this.messages.send({ action: 'show-popup', text: msg }, true)

    }

  async onToastPress()
    {   
        // Ask user for message
        const msg = await this.menus.prompt({
            title: 'Send a toast message to everyone',
            text: 'Enter a message. This message will be displayed to everyone in the space currently.',
            InputType: 'textarea'
    
        })
 
            // No message to send
            if (!msg) { return }
            
                  // Send message
                this.messages.send({ action: 'show-toast', text: msg }, true)


    
     }

        /** Called when a message is received */
        onMessage(msg, fromUserID) {

            // Check message type
            if (msg.action == 'show-toast')
                this.onShowToast(msg, fromUserID)

            if (msg.action=='show-popup')
                this.onShowPopup(msg, fromUserID)

            if (msg.action=='show-alert')
                this.onShowAlert(msg, fromUserID)
            
    
        }
    
        
        /** Called when we receive a message to display text */
        onShowToast(msg, fromUserID) {
    
            // Show toast
             //alot more options exist for properties - color, button action, button cancel...https://developer.vatom.com/plugins/api/menus/#postmessagedata-void
            this.menus.toast({ text: msg.text, duration: 10000 }) 
    
        }
    
        onShowPopup(msg, fromUserID){

            this.menus.displayPopup({
                title: 'Popup Message',
                inAccordion: true,
                section: 'controls',
                panel: {
                    iframeURL: msg.text,
                    maxWidth: 400,
                    maxHeight: 600

                }
            })

        }

       async onShowAlert(msg, fromUserID){

        console.log("called showAlert and will now call getUserData")
            //this.menus.alert(msg.text,'Message','Info')

            //other test function
           console.log( await this.GetUserData())

           console.log("done getting user data")

           console.log(await this.user.AllProperties().length)

           //setting user property
            console.log("setting user property color to red")
           this.user.setProperty('color','red')

        this.hooks.trigger('')



        }

     async  GetUserData() {


      let userP = new UserObjProps()
        userP.UserIDProp = await this.user.getID()
        userP.PositionProp = await this.user.getPosition()      
        userP.DisplayNameProp = await this.user.getDisplayName()
        userP.AllProperties = await this.user.getProperties()
   //     userP.UserRoleProp = await this.user.getProperty('', 'user_role')

     
        return userP
    }
}


