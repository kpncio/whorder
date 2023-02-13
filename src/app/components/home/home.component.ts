import { FetchService } from 'src/app/services/fetch.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface IWhorder {
  meta: {
    unique: string;
    epoch: number;  
    visible: string[];
  };
  data: {
    [content: string]: {
      type: string;
      status: number; // 0 = not watched, 1 = watched, 2 = favorited
    };
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  types: string[][] = [
    ["classic_seasons", "Classic Seasons"],
    ["classic_movies", "Classic Movies"],
    ["classic_specials", "Classic Specials"],
    ["k-9_and_company", "K-9 and Company"],
    ["real_time", "Real Time"],
    ["crossovers", "Crossovers"],
    ["the_movie", "The Movie"],
    ["modern_seasons", "Modern Seasons"],
    ["intermediary_specials", "Intermediary Specials"],
    ["standalone_specials", "Standalone Specials"],
    ["minisodes", "Minisodes"],
    ["torchwood", "Torchwood"],
    ["the_sarah_jane_adventures", "The Sarah Jane Adventures"],
    ["dvd_extras", "DVD Extras"],
    ["dreamland", "Dreamland"],
    ["pond_life", "Pond Life"],
    ["class", "Class"],
    ["redacted", "Redacted"]
  ];

  remote: IWhorder | null = null;
  local: IWhorder | null = null;
  watching: boolean = false;
  loading: boolean = false;
  success: boolean = false;
  watched: string[] = [];
  message: string = '';
  unique: string = '';
  arrayed: any[] = [];

  constructor(private router: Router, private ngZone: NgZone, private fetch: FetchService) {}

  ngOnInit(): void {
    if (localStorage.getItem('unique') != null) {
      this.unique = localStorage.getItem('unique')!;

      this.retrieval('https://api.whorder.com/?operation=read&list=' + this.unique);
    }
  }

  routerLink(route: any[]): void {
    this.ngZone.run(() => this.router.navigate(route)).then();
  }

  toggler(content: string): void {
    if (this.local!.meta.visible.includes(content)) {
      const index = this.local!.meta.visible.indexOf(content);
      this.local!.meta.visible.splice(index, 1);
    } else {
      this.local!.meta.visible.push(content);
    }

    this.arrayer();

    this.retrieval('https://api.whorder.com/?operation=visible&list=' + this.unique + '&type=' + content);
  }

  watcher(content: string = 'Close'): void {
    this.watched = [content];

    switch (content) {
      case '': this.watched.push(''); break;
      case 'Doctor Who: Children in Need': this.watched.push('https://youtu.be/127nRIbDCdA'); break;
      case 'Doctor Who: Attack of the Graske': this.watched.push('https://youtu.be/s8byQmTHvts'); break;
      case 'Doctor Who: Tardisode 1': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=0'); break;
      case 'Doctor Who: Tardisode 2': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=42'); break;
      case 'Doctor Who: Tardisode 3': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=94'); break;
      case 'Doctor Who: Tardisode 4': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=142'); break;
      case 'Doctor Who: Tardisode 5': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=194'); break;
      case 'Doctor Who: Tardisode 6': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=242'); break;
      case 'Doctor Who: Tardisode 7': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=286'); break;
      case 'Doctor Who: Tardisode 8': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=339'); break;
      case 'Doctor Who: Tardisode 9': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=395'); break;
      case 'Doctor Who: Tardisode 10': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=451'); break;
      case 'Doctor Who: Tardisode 11': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=506'); break;
      case 'Doctor Who: Tardisode 12': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=558'); break;
      case 'Doctor Who: Tardisode 13': this.watched.push('https://youtu.be/SP8ws_RP2oU?t=614'); break;
      case 'Doctor Who: Time Crash': this.watched.push('https://www.facebook.com/watch/?v=1474713232564806'); break;
      case 'Doctor Who: Music of the Spheres': this.watched.push('https://youtu.be/CDLgtV5qMv0'); break;
      case 'Doctor Who: Bad Night': this.watched.push('https://dai.ly/x62gxdq'); break;
      case 'Doctor Who: Good Night': this.watched.push('https://dai.ly/x62gxds'); break;
      // TODO: Added rest of minisode/extras (stopped at doctor who: good night)...
      case 'Doctor Who: The Infinite Quest': this.watched.push('https://dai.ly/x2m6rik'); break;
      case 'Meanwhile in the TARDIS Part One': this.watched.push('https://youtu.be/mFdKpZvHYJo'); break;
      case 'Meanwhile in the TARDIS Part Two': this.watched.push('https://youtu.be/mFdKpZvHYJo'); break;
      case 'Pond Life: Episode One': this.watched.push('https://youtu.be/CMdBsc5pQ1k'); break;
      case 'Pond Life: Episode Two': this.watched.push('https://youtu.be/fQZc9DzneUI'); break;
      case 'Pond Life: Episode Three': this.watched.push('https://youtu.be/Pm0dqb7rKpk'); break;
      case 'Pond Life: Episode Four': this.watched.push('https://youtu.be/Ikv0QbubV7Y'); break;
      case 'Pond Life: Episode Five': this.watched.push('https://youtu.be/SxXAY7LyjcM'); break;
      case 'Redacted: SOS': this.watched.push('https://www.bbc.co.uk/sounds/play/p0c0wkjf'); break;
      case 'Redacted: Hysteria': this.watched.push('https://www.bbc.co.uk/sounds/play/p0c2nfhf'); break;
      case 'Redacted: Lost': this.watched.push('https://www.bbc.co.uk/sounds/play/p0c402wd'); break;
      case 'Redacted: Angels': this.watched.push('https://www.bbc.co.uk/sounds/play/p0c585j7'); break;
      case 'Redacted: Interrogation': this.watched.push('https://www.bbc.co.uk/sounds/play/p0c6hw8y'); break;
      case 'Redacted: Recruits': this.watched.push('https://www.bbc.co.uk/sounds/play/p0c7zm10'); break;
      case 'Redacted: Requiem': this.watched.push('https://www.bbc.co.uk/sounds/play/p0c9drv5'); break;
      case 'Redacted: Ghosts': this.watched.push('https://www.bbc.co.uk/sounds/play/p0cb5q8s'); break;
      case 'Redacted: Rescue': this.watched.push('https://www.bbc.co.uk/sounds/play/p0ccggr3'); break;
      case 'Redacted: Salvation': this.watched.push('https://www.bbc.co.uk/sounds/play/p0cfb91v'); break;
      case 'Real Time: Episode 1': this.watched.push('https://youtu.be/wxs6I53tMBk'); break;
      case 'Real Time: Episode 2': this.watched.push('https://youtu.be/wxs6I53tMBk'); break;
      case 'Real Time: Episode 3': this.watched.push('https://youtu.be/wxs6I53tMBk'); break;
      case 'Real Time: Episode 4': this.watched.push('https://youtu.be/wxs6I53tMBk'); break;
      case 'Real Time: Episode 5': this.watched.push('https://youtu.be/wxs6I53tMBk'); break;
      case 'Real Time: Episode 6': this.watched.push('https://youtu.be/wxs6I53tMBk'); break;
    }

    if (content == 'Close') { this.watching = false } else { this.watching = true; }
  }

  viewer(content: string): void {
    this.local!.data[content].status = this.local!.data[content].status == 2 ? 0 : this.local!.data[content].status + 1;

    this.arrayer();

    this.retrieval('https://api.whorder.com/?operation=watched&list=' + this.unique + '&title=' + content + '&status=' + this.local!.data[content].status);
  }

  changed(control: any): void {
    this.unique = control.value;
  }

  loader(): void {
    this.retrieval('https://api.whorder.com/?operation=read&list=' + this.unique);
  }

  creator(): void {
    this.retrieval('https://api.whorder.com/?operation=create');
  }

  retrieval(url: string): void {
    let time = performance.now()

    this.remote = null;
    this.loading = true;
    this.message = '';

    this.fetch.request(url).subscribe((response: IWhorder) => {
      this.loading = false;

      if (response.meta.epoch == 0) {
        this.success = false;
        this.message = `${response.meta.unique} (${Math.round(performance.now() - time)}ms)...`;
      } else if (response.meta.epoch == 1) {
        this.success = true;
        this.message = `${response.meta.unique} (${Math.round(performance.now() - time)}ms)...`;
      } else {
        localStorage.setItem('unique', response.meta.unique);
        
        this.remote = response;
        this.local = response;

        this.success = true;
        this.message = `List retrieved (${Math.round(performance.now() - time)}ms)...`;
      }

      this.arrayer();
    }, _ => {
      this.loading = false;
      this.success = false;
      this.message = 'Unknown error, try again...';
    });
  }

  arrayer(): void {
    this.arrayed = [];

    for (let key in this.local!.data) {
      const value = this.local!.data[key];

      if (this.local!.meta.visible.includes(value.type)) {
        this.arrayed.push([key, value.type, value.status]);
      }
    }
  }
}
