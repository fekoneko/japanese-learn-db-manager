import { FC } from 'react';

const ArticlePage: FC = () => (
  <div className="article">
    <h1>Устойчивые грамматические конструкции ことがある, ことにある, ことにする, ことになる</h1>

    <h2>ことがある</h2>

    <p>
      Устойчивая грамматическая конструкция «глагол (прилагательное) в заключительной форме
      настояще-будущего или прошедшего времени +ことがある（あった）» передает значение «действие
      (качество) случается (случалось)/не случается(-лось). Глагол ある, имеющий самостоятельное
      значение «быть», в конструкции может принимать утвердительные-отрицательные формы и формы
      времени. В зависимости от времени главного глагола (того, что стоит перед ことがある) и
      вспомогательного глагола ある в самой УГК, можно выделить четыре типа этой конструкции,
      различающиеся по значению:
    </p>

    <table>
      <thead>
        <tr>
          <th />
          <th>Вариант УГК</th>
          <th>Значение</th>
          <th>Примеры</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td>(する,よい)ことがある</td>
          <td>
            <p>Случается что-л. делать ( в настоящее время), это стало привычкой</p>
          </td>
          <td>私は日本へ行くことがあります。Мне случается ездить в Японию</td>
        </tr>
        <tr>
          <th>2</th>
          <td>(する,よい)ことがあった</td>
          <td>
            <p>Случалось что-л. делать (это было привычкой)</p>
          </td>
          <td>私は日本へ行くことがあった。Мне случалось ездить в Японию</td>
        </tr>
        <tr>
          <th>3</th>
          <td>(した,よかった)ことがある</td>
          <td>
            <p>
              Довелось что-л. делать В прошлом случалось совершать данное действие (был опыт, был
              случай, когда оно происходило).
            </p>
            <p>
              Эта конструкция не употребляется в речи о недавних событиях (вчера, позавчера,
              недавно) или о событиях у которых известна точная дата (например. в 1990 году)
            </p>
          </td>
          <td>私は日本へ行ったことがあります。У меня был случай съездить в Японию</td>
        </tr>
        <tr>
          <th>4</th>
          <td>(した,よかった)ことがあった</td>
          <td>
            <p>
              Довелось что–л. сделать. В прошлом в какой то конкретный промежуток времени был случай
              при котором данное действие имело место (в прошлом был опыт)
            </p>
          </td>
          <td>
            留学生の時、日本へ行ったことがあった。У меня был случай съездить в Японию, когда я был
            на стажировке за границей.
          </td>
        </tr>
      </tbody>
    </table>

    <p>
      Наиболее часто встречаются 1 и 3-й типы конструкции. В предложениях с этой конструкцией могут
      употребляться наречия, обозначающие частоту действия (まれに、たまに、– «редко». よく –
      «часто» и т. п.)
    </p>

    <h2>ことにある</h2>

    <p>
      Устойчивая грамматическая конструкция «3-я основа глагола глагола + ことにある» имеет значение
      «заключаться в чем-либо, состоять в чем-либо»
    </p>

    <blockquote>
      <p>センターの活動は文化交流の拡充することにある。</p>
      <p>Сэнта:-но кацудо:-ва бунка-ко:рю:-но какудзю:-суру кото-ни ару.</p>
      <p>Деятельность Центра заключается в расширении культурных связей.</p>
    </blockquote>

    <h2>ことにする</h2>

    <p>
      Устойчивая грамматическая конструкция «3-я основа глагола глагола (ない-форма
      глагола)+ことにする» имеет значение «решил что-л делать (или не делать)». Вспомогательный
      глагол する может принимать формы настояще-будущего, прошедшего времени или длительного вида,
      и в зависимости от этого меняется оттенок значений грамматической конструкции.
    </p>

    <ol>
      <li>
        Глагол+ことにする — «решил что-л. делать», при этом решение принято в настоящем, а действие
        совершится в будущем
        <blockquote>
          <p>
            毎日少しずつ読むことにことにします。Майнити скоси-дзуцу ёму кото ни симас. -(Решил, что)
          </p>
          <p>Буду читать понемногу каждый день</p>
        </blockquote>
      </li>
      <li>
        Глагол+ことにした – «решил что-л. делать», при этом решение было принято в прошлом, а само
        действие либо уже выполнялось, либо будет выполнено в будущем
        <blockquote>
          <p>
            毎日少しずつ読むことにしました。 Майнити скоси-дзуцу ёму кот ни симасита. — Решил читать
          </p>
          <p>понемногу каждый день (и читаю или буду читать)</p>
        </blockquote>
      </li>
      <li>
        Глагол+ことにしている – «Взять за правило что-л. делать, иметь обыкновение что-л. делать»
        <blockquote>
          <p>
            毎日少しずつ読むことにしています。 Майнити скоси-дзуцу ёму кот-ни ситэ имас.— Взял за
          </p>
          <p>правило читать каждый день (Я обычно читаю каждый день).</p>
        </blockquote>
      </li>
    </ol>

    <h2>ことになる</h2>

    <p>
      Устойчивая грамматическая конструкция «3-я основа глагола глагола +ことになる» передает
      значение «получается (случается) так, что что-л делает), то есть действие в данной конструкции
      обусловлено чьими-то решениями или обстоятельствами, не зависящими от говорящего.
      Вспомогательный глагол なる может принимать формы настоящее-будущего, прошедшего времени или
      длительного вида, и поэтому существует три типа данной конструкции:
    </p>

    <h6>…ことになる – «Получится так, что будем делать что-л.(настоящее-будущее время)»</h6>
    <blockquote>
      <p>海外へ行くことになるでしょう。 Кайгай-э ику кото-ни нару дэсё:.</p>
      <p>Кайгай-э ику кото-ни нару дэсё:.</p>
      <p>Возможно, так сложатся обстоятельства, что придется уехать за границу.</p>
    </blockquote>

    <h6>…ことになった – «Случилось так, что стали делать что-л.(прошедшее время)»</h6>
    <blockquote>
      <p>海外へ行くことになった。</p>
      <p>Кайгай-э ику кото-ни натта.</p>
      <p>Сложилось так, что они уехали за границу.</p>
    </blockquote>

    <h6>ことになっている — «Заведено так, что делаем что-л.(действие постоянно)»</h6>
    <blockquote>
      <p>今日の議長を田中さん に 務め て いただくことになっております。</p>
      <p>Кё:-но гитё:-о Танака-сан-ни цутомэтэ итадаку кото-ни наттэ оримас.</p>
      <p>
        Председателем сегодняшнего собрания является господин Танака (букв. так заведено, что
        председателем сегодняшнего собрания…)
      </p>
    </blockquote>
  </div>
);
export default ArticlePage;