class ZeoPayrollGivingElement extends window.HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
    this.range = null
    this.rangeV = null
    this.takeHomePostV = 0
    this.tithePayrollV = 0
    this.payrollBenefitV = 0
  }

  connectedCallback () {
    this._render()
  }

  _render () {
    this.shadow.innerHTML = `
<style>
    body {
        -webkit-tap-highlight-color: rgba(0, 0, 0, .3);
    }

    h2 {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        display: inline-block;
        font-size: 34px;
        color: #303133;
        line-height: 1.2;
        margin: 27px 0 0;
        font-family: SocialGothic-Demibold;
        font-weight: 500;
        font-style: normal;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        -webkit-font-smoothing: antialiased;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        text-align: left;
    }

    p {
        margin-top: 0;
        font-size: 17px;
        line-height: 1.75;
        margin: 18px 0 0;
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        text-align: left;
        color: #303133;
        font-weight: 400;
        font-family: Poppins;
        -webkit-font-smoothing: antialiased;
        -webkit-tap-highlight-color: rgba(0, 0, 0, .3);
    }

    .range-slider span {
        font-size: 17px;
        line-height: 1.75;
        color: #303133;
        font-weight: 400;
        font-family: Poppins;
        -webkit-font-smoothing: antialiased;
        -webkit-tap-highlight-color: rgba(0, 0, 0, .3);
    }

    .range-slider span.range-slider__title {
        padding-right: 20px;
    }

    .range-slider span.range-slider__value {
        color: white;
    }

    ::selection {
        background: #e14199;
        color: #fff !important;
    }

    .range-slider {
        margin: 30px 0px 20px 0px;
    }

    .range-slider {
        width: 100%;
    }

    .range-slider__range {
        -webkit-appearance: none;
        width: calc(100% - (320px));
        height: 10px;
        border-radius: 5px;
        background: #d7dcdf;
        outline: none;
        padding: 0;
        margin: 0;
    }

    .range-slider__range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #2c3e50;
        cursor: pointer;
        -webkit-transition: background 0.15s ease-in-out;
        transition: background 0.15s ease-in-out;
    }

    .range-slider__range::-webkit-slider-thumb:hover {
        background: #e14199;
    }

    .range-slider__range:active::-webkit-slider-thumb {
        background: #e14199;
    }

    .range-slider__range::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border: 0;
        border-radius: 50%;
        background: #2c3e50;
        cursor: pointer;
        -moz-transition: background 0.15s ease-in-out;
        transition: background 0.15s ease-in-out;
    }

    .range-slider__range::-moz-range-thumb:hover {
        background: #e14199;
    }

    .range-slider__range:active::-moz-range-thumb {
        background: #e14199;
    }

    .range-slider__range:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 3px #fff, 0 0 0 6px #e14199;
    }

    .range-slider__value {
        /*display: inline-block;*/
        position: relative;
        width: 120px;
        color: #fff;
        line-height: 20px;
        text-align: center;
        border-radius: 3px;
        background: #2c3e50;
        padding: 5px 10px;
        margin-left: 20px;
    }

    .range-slider__value:after {
        position: absolute;
        top: 8px;
        left: -7px;
        width: 0;
        height: 0;
        border-top: 7px solid transparent;
        border-right: 7px solid #2c3e50;
        border-bottom: 7px solid transparent;
        content: "";
    }

    ::-moz-range-track {
        background: #d7dcdf;
        border: 0;
    }

    input::-moz-focus-inner,
    input::-moz-focus-outer {
        border: 0;
    }

    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    @media screen and (max-width: 600px) {
        .container {
            flex-direction: column;
        }
    }

    .container .item {
        flex-basis: 25%;
        flex-grow: 0;
        padding-bottom: 10px;
    }

    h3,
    h4 {
        text-align: center;
        color: #303133;
        line-height: 1.2;
        margin: 27px 0 0;
        font-family: SocialGothic-Demibold;
        font-weight: 500;
        font-style: normal;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }

    h3 {
        font-size: 34px;
        font-weight: 400;
        font-family: Poppins;
    }

    h4 {
        font-size: 18px;
    }

    hr {
        width: 50%;
        margin: 0 auto;
    }

    p.note {
        text-align: right;
    }
</style>

<div class="range-slider">
    <span class="range-slider__title">Select your salary</span>
    <input class="range-slider__range" type="range" value="45000" min="12000" max="200000" step="1000">
    <span class="range-slider__value">£40,000</span>
</div>

<div class="container">
    <div class="item">
        <h3 class="take-home-post">£0</h3>
        <h4>Net take home pay after title (monthly)</h4>
    </div>
    <div class="item">
        <h3 class="tithe-payroll">£0</h3>
        <h4>Total received by church through payroll giving</h4>
    </div>
    <div class="item">
        <h3 class="payroll-benefit">£0</h3>
        <h4>Total benefit over gift aid</h4>
    </div>
</div>
<p class="note"><i>* Approximations based on FY 2020/21</i></p>`

    this.bindAll()
    this.rangeChanged(60000)
  }
  bindAll () {
    this.range = this.shadow.querySelector('.range-slider__range')
    this.rangeV = this.shadow.querySelector('.range-slider__value')
    this.takeHomePostV = this.shadow.querySelector('.take-home-post')
    this.tithePayrollV = this.shadow.querySelector('.tithe-payroll')
    this.payrollBenefitV = this.shadow.querySelector('.payroll-benefit')
    this.range.addEventListener('input', () => {
      this.rangeChanged(this.range.value)
    })
  }
  rangeChanged (salary) {
    // console.log('rangeChanged', salary)
    this.rangeV.innerHTML = `£${this.numberWithCommas(salary)}`
    const {takeHomePost, tithePayroll, payrollBenefit} = this.calculateSavings(salary)
    console.log('savings', takeHomePost, tithePayroll, payrollBenefit)
    this.takeHomePostV.innerHTML = `£${this.numberWithCommas(takeHomePost)}`
    this.tithePayrollV.innerHTML = `£${this.numberWithCommas(tithePayroll)}`
    this.payrollBenefitV.innerHTML = `£${this.numberWithCommas(payrollBenefit)}`
  }
  numberWithCommas (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  calculateSavings (salary) {
    console.log('calculateSavings', salary)

    const TAX_BASIC = 11850
    const TAX_BASIC_RATE = 0.2
    const TAX_HIGHER = 46350
    const TAX_HIGHER_RATE = 0.4
    const TAX_ADDITIONAL = 150000
    const TAX_ADDITIONAL_RATE = 0.45
    const TAX_ALLOWANCE_CUTOFF = 100000
    const TAX_ALLOWANCE_DROPOFF = 2

    const NI_BASIC = 8424
    const NI_BASIC_RATE = 0.12
    const NI_HIGHER = 46350
    const NI_HIGHER_RATE = 0.02

    const TITHE = 0.1
    const GIFTAID = 0.25

    if (!salary) {
      return {takeHomePost: 0, tithePayroll: 0, payrollBenefit: 0}
    }

    const taxBasic = salary > TAX_BASIC ? Math.floor((Math.min(salary, TAX_HIGHER) - TAX_BASIC) * TAX_BASIC_RATE) : 0
    // console.log('taxBasic', taxBasic)

    const paExcess = salary > TAX_ALLOWANCE_CUTOFF ? (salary - TAX_ALLOWANCE_CUTOFF) : 0
    const paOffset = paExcess / 2 > TAX_BASIC ? TAX_BASIC : (paExcess / TAX_ALLOWANCE_DROPOFF)

    const taxHigher = salary > TAX_HIGHER ? Math.floor(((Math.min(salary, TAX_ADDITIONAL) - TAX_HIGHER + paOffset)) * TAX_HIGHER_RATE) : 0
    const taxAdditional = salary > TAX_ADDITIONAL ? Math.floor((salary - TAX_ADDITIONAL) * TAX_ADDITIONAL_RATE) : 0
    // console.log('taxAdditional', taxAdditional)

    const taxTotal = taxBasic + taxHigher + taxAdditional
    // console.log('taxTotal', taxTotal)

    const ni = salary > NI_HIGHER ? Math.floor((((NI_HIGHER -
                NI_BASIC) *
            NI_BASIC_RATE) + ((salary - NI_HIGHER) *
            NI_HIGHER_RATE))) : (salary > NI_BASIC ? Math.floor(((
      salary - NI_BASIC) *
            NI_BASIC_RATE)) : 0)
    // console.log('ni', ni)

    const takeHomeNet = salary - taxTotal - ni
    // console.log('take-home-net', takeHomeNet)

    const tithe = Math.floor(takeHomeNet * TITHE)
    // console.log('tithe', tithe)

    const giftAid = Math.floor(tithe * GIFTAID)
    // console.log('gift-aid', giftAid)

    const titheTotal = tithe + giftAid
    // console.log('tithe-total', titheTotal)

    const takeHomePost = Math.floor((takeHomeNet - tithe) / 12)
    // console.log('take-home-post', takeHomePost)

    const tithePayroll =
            salary > TAX_ADDITIONAL
              ? Math.floor(tithe / (1 - TAX_ADDITIONAL_RATE))
              : (
                salary > TAX_HIGHER
                  ? Math.floor(tithe / (1 - TAX_HIGHER_RATE))
                  : Math.floor(tithe / (1 - TAX_BASIC_RATE))
              )
    // console.log('tithe-payroll', tithePayroll)

    const payrollBenefit = tithePayroll - titheTotal
    // console.log('payroll-benefit', payrollBenefit)

    return {takeHomePost, tithePayroll, payrollBenefit}
  }
}

window.customElements.define('zeo-payroll-giving', ZeoPayrollGivingElement)
