import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  /* make message service public, so that it can be bound in template for message component */
  constructor(public messageService : MessageService) { }

  ngOnInit(): void {
  }

}
