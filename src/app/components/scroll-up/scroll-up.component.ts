import { Component, Inject, HostListener } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-scroll-up",
  templateUrl: "./scroll-up.component.html",
  styleUrls: ["./scroll-up.component.scss"],
})
export class ScrollUpComponent {

  public faChevronUp = faChevronUp;
  public finestra_scorreva: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.finestra_scorreva = true;
    } else if (
      (this.finestra_scorreva && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.finestra_scorreva = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      let scorrimento_corrente =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scorrimento_corrente > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, scorrimento_corrente - scorrimento_corrente / 8);
      }
    })();
  }
}
