import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StartGameComponent } from './start-game.component';

describe('Start game component', () => {
  let component: StartGameComponent;
  let fixture: ComponentFixture<StartGameComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StartGameComponent],
    });

    fixture = TestBed.createComponent(StartGameComponent);
    fixture.detectChanges();
    component = TestBed.createComponent(StartGameComponent).componentInstance;
    router = TestBed.inject(Router);
  });

  it('Start game button works with the default dropdown value', () => {
    const navigateSpy = spyOn(router, 'navigate');

    fixture.nativeElement.querySelector('button').click();

    expect(navigateSpy).toHaveBeenCalledWith(['game', 6]);
  });

  it('Start game button works with a custom dropdown value', async () => {
    const navigateSpy = spyOn(router, 'navigate');

    const deckSizeSelect = fixture.nativeElement.querySelector('select');
    deckSizeSelect.value = 8;
    deckSizeSelect.dispatchEvent(new Event('change'));

    fixture.nativeElement.querySelector('button').click();

    expect(navigateSpy).toHaveBeenCalledWith(['game', '8']);
  });
});
