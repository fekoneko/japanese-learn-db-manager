import { FC } from 'react';

const ArticlePage: FC = () => (
  <article className="article">
    <h1>Происхождение японского языка</h1>
    <p>
      Происхождение японского языка сегодня не до конца выяснено. Ясно, что в японский язык вместе с
      иероглифами пришло много заимствований из китайского, однако происхождение и родство слов,
      относящихся к собственно японской лексике (ваго) является предметом споров для лингвистов.
      Ранее японский язык рассматривали отдельно как не входящий ни в одну из языковых семей.
      Сегодня же больше всего сторонников находит версия о том, что японский язык относится к
      алтайской языковой семье наряду с корейским языком, с которым имеет наиболее близкое из всех
      прочих языков родство.
    </p>
    <p>
      Происхождение японского языка неразрывно связано с этногенезом японского народа. На
      сегодняшний день науке известно, что в период от 3-го в. до н. э. по 3 в. н . э., называемый в
      японской археологии периодом яёй, на Японский архипелаг приходят переселенцы с Корейского
      полуострова, являющиеся кочевыми племенами тунгусского происхождения. Эти переселенцы, которые
      стали прародителями современных корейцев, говорили на языке, относящемся к алтайской семье
      языков, принесли на Японский архипелаг рисосеяние и использование металлов. Именно с этого
      момента начинается зарождение японского этноса и развитие собственно японского языка.
    </p>
    <p>
      И действительно, можно на многих примерах убедиться, что японский язык имеет структурное
      сходство с корейским и с другими языками алтайской семьи. Это сходство заключается в сходстве
      строения предложения (одинаковый порядок слов), морфологии (и японский, и корейский языки
      имеют агглютинативный строй). Некоторые грамматические единицы имеют не только сходное
      значение, функции, но и сходное звучание.
    </p>
    <p>
      Структурно сходны глагольные формы: глаголы в обоих языках не изменяются по лицам и числам и
      имеют стандартное окончание (у в японском и та/да — в корейском)
    </p>

    <table>
      <thead>
        <tr>
          <th>значение</th>
          <th>японский</th>
          <th>корейский</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>идти</td>
          <td>ику</td>
          <td>када</td>
        </tr>
        <tr>
          <td>делать</td>
          <td>суру</td>
          <td>хада</td>
        </tr>
        <tr>
          <td>жить</td>
          <td>суму</td>
          <td>сальда</td>
        </tr>
      </tbody>
    </table>

    <figure>
      <blockquote>
        <p>
          «И в японском и в корейском конкретные формы глаголов по большей части образуются от
          основ, в японском у глаголов 5 основ, в корейском — 2. И в японском и в корейском основы
          глаголов образуются по сходному алгоритму — изменение окончания глагольной словоформы.
        </p>
        <p>
          И в японском и в корейском 2 базовых грамматических времени: прошедшее и настояще-будущее.
        </p>
        <p>Сравним как образуется прошедшее время в японском и в корейском:</p>

        <table>
          <thead>
            <tr>
              <th>перевод</th>
              <th>словарная форма</th>
              <th>прошедшее время</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>идти</td>
              <td>ику</td>
              <td>итта</td>
            </tr>
            <tr>
              <td>делать</td>
              <td>суру</td>
              <td>сита</td>
            </tr>
            <tr>
              <td>жить</td>
              <td>суму</td>
              <td>сунда</td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>перевод</th>
              <th>словарная форма</th>
              <th>прошедшее время</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>идти</td>
              <td>када</td>
              <td>катта</td>
            </tr>
            <tr>
              <td>делать</td>
              <td>хада</td>
              <td>хаётта/хэтта</td>
            </tr>
            <tr>
              <td>жить</td>
              <td>сальда</td>
              <td>саратта</td>
            </tr>
          </tbody>
        </table>

        <p>
          налицо явное структурное сходство способа образования прошедшего времени в обоих языках
        </p>
        <p>Сравнение длительного вида</p>
        <p>
          В японском длительный вид образуется из ТЭ-формы и вспомогательного глагола ИРУ ~ ИРУ
          экзистенциальному глаголу, используемому с одушевленными существительными.
        </p>
        <p>
          В корейском длительный вид образуется путем присоединения к корню глагола окончания КО +
          глагол ИТТА — «быть».
        </p>
        <p>Сейчас я живу в Сеуле.</p>
        <p>яп: ИМА ва БОКУ га СОУРУ дэ СУНДЭ ИРУ.</p>
        <p>кор.:ЧИГЫМ ын НЭ га СОУР е САЛЬГО ИТТА.»</p>
      </blockquote>

      <figcaption>
        <i>(из обсуждения на сайте http://polusharie.com/index.php?topic=2294.0)</i>
      </figcaption>
    </figure>

    <p>
      Там же при сравнении форм вежливости проводится интересная параллель между суффиксами
      вежливости -мас (в японском языке) и -мнида (в корейском). При этом окончание вопросительной
      формы суффикса —мнида (-мникка) созвучно японской вопросительной частице ка.
    </p>
    <p>
      Можно приводить еще множество примеров структурного сходства: например, наличие в корейском и
      японском языках «двух рядов числительных» — собственно корейских (японских) и заимствованных
      (китайских), что говорит о сходном образе мышления. Сходен не только способ образования
      падежей в корейском и японском языках, но и значения тех или иных падежных частиц.
    </p>
    <p>Для примера можно сравнить японский и корейский показатели дательного падежа.</p>

    <p>
      <b>Японский показатель дательного падежа ни имеет следующие значения:</b>
    </p>
    <ol>
      <li>место</li>
      <li>адресат действия</li>
      <li>направление действия</li>
      <li>время</li>
      <li>превращение, появление нового состояния</li>
      <li>деятеля при страдательном залоге</li>
    </ol>

    <p>
      <b>Корейский дательный падеж -е (для неодушевле. предметов) имеет следующие значения:</b>
    </p>
    <ol>
      <li>место</li>
      <li>адресат (объект) действия</li>
      <li>направление (конечный пункт) действия</li>
      <li>времени</li>
      <li>причины</li>
      <li>
        сочетается с послелогами (аналогично японский падеж -ни чаще всего сочетается с послелогами)
      </li>
    </ol>

    <p>
      <b>Корейский дательный падеж еге (для одушевленных существительных) имеет значения:</b>
    </p>
    <ol>
      <li>обладателя чего-л</li>
      <li>адресата (объекта действия)</li>
      <li>субъекта действия при страдательном залоге</li>
    </ol>

    <p>
      Подобных сходств можно найти немало. Это лишь примеры, взятые при поверхностном знакомстве с
      грамматикой корейского языка.
    </p>
    <p>Также в японском и корейском языка разных периодов много лексических параллелей.</p>
    <p>
      Например, практически идентично или близко звучание некоторых слов древнеяпонского языка и
      языка Когурё (одно из древних государств на территории Кореи): море — нами (в современном
      японском языке это слово значит «волна»), заяц — древнеяп. усаги, когуре — осагам.
    </p>
    <p>
      Множество параллелей и с языком Пэкче, в особенности это касается названий животных, которые
      не обитали в Японии, или предметов культуры, привнесенных корейскими переселенцами в этот
      период: например, слово кото, обозначающее традиционный японский щипковый инструмент, пришло
      из языка Пэкче.Другие примеры:
    </p>

    <table>
      <thead>
        <tr>
          <th />
          <th>Язык Пэкче</th>
          <th>Древнеяпонский язык</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td>кас, кат «сторона»</td>
          <td>ката «сторона»</td>
        </tr>
        <tr>
          <th>2</th>
          <td>кыры «сокровища»</td>
          <td>кура «сокровищница»</td>
        </tr>
        <tr>
          <th>3</th>
          <td>ра (на) «земля»</td>
          <td>на (но) «поле»</td>
        </tr>
        <tr>
          <th>4</th>
          <td>миль «вода»</td>
          <td>миду «вода»</td>
        </tr>
        <tr>
          <th>5</th>
          <td>маль, мури «группа»</td>
          <td>мура «группа», «стая»</td>
        </tr>
        <tr>
          <th>6</th>
          <td>пури «деревня», «селение»</td>
          <td>мура «селение» (праяп. пурэ)</td>
        </tr>
        <tr>
          <th>7</th>
          <td>сйома «остров»</td>
          <td>сима «остров»</td>
        </tr>
        <tr>
          <th>8</th>
          <td>сури «вершина»</td>
          <td>сора «небо»</td>
        </tr>
        <tr>
          <th>9</th>
          <td>чира «маленький камень»</td>
          <td>тири «пыль»</td>
        </tr>
      </tbody>
    </table>

    <p>
      Несмотря на то, что японский язык развивался изолированно от корейского, до сих пор можно
      найти созвучия между словами современного корейского и современного японского языков:
    </p>

    <table>
      <thead>
        <tr>
          <th />
          <th>Современный корейский</th>
          <th>Современный японский</th>
          <th>Перевод</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td>хорани</td>
          <td>тора</td>
          <td>«тигр»*</td>
        </tr>
        <tr>
          <th>2</th>
          <td>пат</td>
          <td>та</td>
          <td>«поле»**</td>
        </tr>
        <tr>
          <th>3</th>
          <td>чок</td>
          <td>токи</td>
          <td>«время»</td>
        </tr>
        <tr>
          <th>4</th>
          <td>чот</td>
          <td>тити</td>
          <td>«молоко»</td>
        </tr>
        <tr>
          <th>5</th>
          <td>кот</td>
          <td>кото</td>
          <td>«вещь»</td>
        </tr>
        <tr>
          <th>6</th>
          <td>сом</td>
          <td>сима</td>
          <td>«остров»</td>
        </tr>
        <tr>
          <th>7</th>
          <td>мом</td>
          <td>ми</td>
          <td>«тело»</td>
        </tr>
        <tr>
          <th>8</th>
          <td>мит</td>
          <td>мото</td>
          <td>«низ»</td>
        </tr>
        <tr>
          <th>9</th>
          <td>у</td>
          <td>уэ</td>
          <td>«верх»</td>
        </tr>
        <tr>
          <th>10</th>
          <td>ком</td>
          <td>кума</td>
          <td>«медведь»</td>
        </tr>
        <tr>
          <th>11</th>
          <td>сасым</td>
          <td>сиси</td>
          <td>«олень»</td>
        </tr>
        <tr>
          <th>12</th>
          <td>турым</td>
          <td>цуру</td>
          <td>«журавль»</td>
        </tr>
        <tr>
          <th>13</th>
          <td>таль (так)</td>
          <td>тори</td>
          <td>«курица»</td>
        </tr>
        <tr>
          <th>14</th>
          <td>пэм</td>
          <td>хэби</td>
          <td>«змея»</td>
        </tr>
        <tr>
          <th>15</th>
          <td>поль</td>
          <td>хара</td>
          <td>«степь»</td>
        </tr>
        <tr>
          <th>16</th>
          <td>пиккаль</td>
          <td>хикари</td>
          <td>«цвет»</td>
        </tr>
      </tbody>
    </table>

    <p>
      <i>
        (примеры взяты из статьи А. Ю. Иванова «Влияние корейского языка на процесс становления
        японского языка»)
      </i>
    </p>

    <blockquote>
      <p>
        <i>
          * Животные семейства кошачьих в древней Японии не было, и поэтому японцы узнавали о них
          лишь из рассказов очевидцев, то есть переселенцев на Японские острова с материка,
          одновременно заимствуя и слова.
        </i>
      </p>
      <p>
        <i>
          ** Земледельческий термин та “поле” в японском языке встречается очень часто, особенно в
          географических названиях и именах. Например, из 5736 географических названий префектуры
          Ниигата — 926 (1/5 всех названий) включает в себя слово та. Между тем этот термин
          корейского происхождения, отражающий вклад переселенцев с Корейского полуострова в
          освоении земельных угодий и развитии сельского хозяйства в Японии. Именно на современной
          территории префектуры Ниигата древние “Фудоки” отражают интенсивное поселение пришельцев
          из Кореи и освоение ими земель. Как установлено, японское слово та произошло от корейского
          слова пат, впоследствии трансформировавшееся в древнеяпонское пата (сейчас произносится
          как хатакэ) и сокращенное до одного слога — та. Предполагается также, что японское слово
          та происходит от корейского ттанъ “земля”.
        </i>
      </p>
    </blockquote>

    <p>
      Объясняется это не только тем, что прародителями японского и корейского этносов был, вероятно,
      один и тот же народ, но и тем, что Корея являлась наряду с Китаем одним из культурных доноров
      на начальном этапе формирования японского государства. Есть даже предположения, что корейский
      язык был языком, на котором в Японии разговаривала знать.
    </p>
    <p>
      Сравнение лексики японского, корейского и алтайского языков проводил также лингвист С. А.
      Старостин в работе «Алтайская проблема и происхождение японского языка». На основе
      проведенного им исследования лексики также выявлено, что корейский и японский являются
      наиболее близко родственными. Однако не все согласны с подходом, когда сравнивается лексика,
      так как за историю развития языка слово может измениться до неузнаваемости. Да и фонетическая
      система корейского и японского языков совершенно разные. Японская фонетическая система проще и
      в ней присутствуют только открытые слоги, отличаются звуки и т. п.
    </p>
    <p>
      Ученые объясняют это тем, что язык переселенцев претерпел фонетические изменения,
      взаимодействуя с языком другой пришлой группы населения — австронезийцев.
    </p>
    <p>
      Также достоверно неизвестно, каков процент лексики австронезийского населения в современном
      японском языке.
    </p>
  </article>
);
export default ArticlePage;
