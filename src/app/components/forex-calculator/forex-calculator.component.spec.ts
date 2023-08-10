import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForexCalculatorComponent } from "./forex-calculator.component";

describe("ForexCalculatorComponent", () => {
  let component: ForexCalculatorComponent;
  let fixture: ComponentFixture<ForexCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
      declarations: [ForexCalculatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render title in a h6 tag", async(() => {
    const fixture = TestBed.createComponent(ForexCalculatorComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h6").textContent).toContain("Forex Calculator");
  }));
});
