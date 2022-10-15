import { Rendition } from 'epubjs';

export interface Point2D {
  x: number;
  y: number;
}

export interface TouchEvent {
  start: Point2D;
  end: Point2D;
  moved: boolean;
}

export class RenditionGesturesEmitter {
  public static listen(rendition: Rendition) {
    const touchEvent = {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
      moved: false,
    };

    rendition.on('touchstart', (event: any) => {
      touchEvent.moved = false;
      touchEvent.start.x = event.changedTouches[0].screenX;
      touchEvent.start.y = event.changedTouches[0].screenY;
    });

    rendition.on('touchmove', () => {
      touchEvent.moved = true;
    });

    rendition.on('touchend', (event: any) => {
      touchEvent.end.x = event.changedTouches[0].screenX;
      touchEvent.end.y = event.changedTouches[0].screenY;
      const gesture = this.handleEvent(touchEvent);
      rendition.emit(gesture);
    });
  }

  private static handleEvent(event: TouchEvent) {
    if (!event.moved) {
      return 'tap';
    } else if (event.end.x < event.start.x) {
      // swiped left!
      return 'swipe:left';
    } else if (event.end.x > event.start.x) {
      // swiped right!
      return 'swipe:right';
    }
  }
}
