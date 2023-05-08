import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export type Settings = {
  title: string,
  description: string;
  icon: string,
  tab: string
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  current_tab: string | null = null;
  currently_selelected_tab: Settings | null = null;
  settings: Settings[] = [
    {
      title: "Profile",
      description: "View Profile",
      icon: "fa fa-user",
      tab: "profile"
    },
    /*{
      title: "Verify Account",
      description: "Complete your accout KYC",
      icon: "fa fa-key",
      tab: "verify"
    },*/
    // {
    //   title: "Account Health",
    //   description: "Know you accout health status",
    //   icon: "fa fa-heart",
    //   tab: "health"
    // },
    // {
    //   title: "Customer Reviews",
    //   description: "See what customers are saying",
    //   icon: "fa fa-users",
    //   tab: "reviews"
    // },
    {
      title: "Password",
      description: "Change account password",
      icon: "fa fa-key",
      tab: "password"
    },
    {
      title: "Notifications",
      description: "Adjust your notification settings",
      icon: "fa fa-bell",
      tab: "notifications"
    }
    // {
    //   title: "Support",
    //   description: "Speak to our customer service",
    //   icon: "fa fa-question",
    //   tab: "support"
    // }
  ]

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(s=>{
      if(s.has("tab")) {
        this.current_tab = s.get("tab");
      }
      else {
        this.current_tab = null;
      }
    })    
  }

  showTab(i: Settings | null) {
    this.currently_selelected_tab = i;
    if(i !== null) {
      this.router.navigate(["/auth/settings"], {queryParams: {tab: i.tab}})
    }
    else {
      this.router.navigate(["/auth/settings"])
    }
  }

}
