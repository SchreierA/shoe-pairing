import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { GamePageComponent } from './game-page.component';

describe('Game page component', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;
  let router: Router;

  const activatedRouteMock = {
    params: {
      subscribe: () => undefined,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GamePageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
      ],
    });

    fixture = TestBed.createComponent(GamePageComponent);
    component = TestBed.createComponent(GamePageComponent).componentInstance;
    router = TestBed.inject(Router);
  });

  it('should redirect when routing param is odd', async () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.handleFallback({ size: 7 });

    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should redirect when routing param is less than 6', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.handleFallback({ size: 4 });

    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should redirect when routing param is greater than 20', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.handleFallback({ size: 22 });

    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should redirect when there is no parameter', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.handleFallback({ size: null });

    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should not redirect with proper values', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.handleFallback({ size: 20 });
    component.handleFallback({ size: 6 });

    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
