import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActionSheetButton } from '@ionic/angular'; // Add this import


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

  constructor(private alertController: AlertController) {}

  async showLoginAlert() {
    const alert = await this.alertController.create({
      header: 'You must be logged in.',
      cssClass: 'custom-alert',
      message: 'Rewards are waiting ✈️⭐',
      buttons: ['Okay!'], 
    });

    await alert.present();
  }

  getActionSheetButtons(context: string): ActionSheetButton[] {
    return [
      {
        text: `More Details on ${context}`,
        icon: 'information-circle-outline',
        handler: () => {
          console.log(`More details clicked for ${context}`);
        }
      },
      {
        text: `Help with ${context}`,
        icon: 'help-circle-outline',
        handler: () => {
          console.log(`Help clicked for ${context}`);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        icon: 'close'
      }
    ];
  }
}
