// Init SpeechSynth API
const synth = window.speechSynthesis

// 获取元素
const textForm = document.querySelector('form')
const textInput = document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')
const rate = document.querySelector('#rate')
const rateValue = document.querySelector('#rate-value')
const pitch = document.querySelector('#pitch')
const pitchValue = document.querySelector('#pitch-value')
const body = document.querySelector('body')

// Init Voice Array
let voices = []

// 异步获取声音文件
const getVoices = () => {
  voices = synth.getVoices()

  // 初始化声音文件选择器
  voices.forEach(voice => {
    const option = document.createElement('option')
    // option label
    option.textContent = voice.name + '(' + voice.lang + ')'
    // option attr
    option.setAttribute('data-lang', voice.lang)
    option.setAttribute('data-name', voice.name)
    voiceSelect.appendChild(option)
  })
}

getVoices()
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices // 异步获取
}

// Speak
const speak = () => {
  // 是否正在speak
  if (synth.speaking) {
    console.error('慢点~说着呢...')
    return
  }
  // 可以speak
  if (textInput.value.trim() !== '') {
    // Speech对象初始化
    const speakText = new SpeechSynthesisUtterance(textInput.value)

    // 相关回调
    speakText.onerror = e => {
      console.error('出错了..')
    }
    speakText.onend = e => {
      console.log('这段说完了..')
    }

    // 声音配置初始化
    // current selected name
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    )
    // get voice file
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice
      }
    })
    // rate
    speakText.rate = rate.value
    speakText.pitch = pitch.value

    // Speak
    synth.speak(speakText)
  }
}

// 绑定事件

// Submit
textForm.addEventListener('submit', e => {
  e.preventDefault()
  speak()
  textInput.blur()
})

// Rate value change
// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value))

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value))

// Voice select change
voiceSelect.addEventListener('change', e => speak())
