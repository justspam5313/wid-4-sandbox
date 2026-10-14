import { useState } from "react";
// Bsp. Zähler

export default function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState({ wert: 0, kommentar: "" });
  console.log("Rerender");
  return (
    <div className="App">
      <h2>Beispiel Zähler</h2>
      <div>{counter}</div>
      <button onClick={() => setCounter(0)}>Klick mich</button>
      <h4>
        Erklärung wieso nur einmal "rerender" in die console geschrieben wird:
        React vergleicht den zukünftigen Zustand mit dem aktuellen Zustand.
        Falls diese nach dem Klick noch gleich sind, wird nichts gerendert und
        keine Änderung ausgeführt.
      </h4>
      <h4>------------------------</h4>
      <h4>
        Arrays und Objekte werden über eine Referenz verglichen und nicht über
        ihren Wert. Die Referenz ist sozusagen die Adresse im Speicher, an der
        das Array bzw. Objekt liegt. React prüft also nicht, ob der Inhalt
        gleich ist, sondern ob es dasselbe Array/Objekt ist.
        <br />
        Beispiel: [1, 2] === [1, 2] ergibt false, weil es zwei verschiedene
        Arrays sind, auch wenn der Inhalt gleich ist.
        <br />
        Folge: Wird ein Array direkt verändert (z.B. mit liste.push(3)) und
        danach dasselbe Array an setListe übergeben, bleibt die Referenz gleich.
        React erkennt keine Änderung und rendert nicht neu.
        <br />
        Lösung: Immer ein neues Array bzw. Objekt erstellen, z.B. mit dem
        Spread-Operator: setListe([...liste, 3]). Dadurch entsteht eine neue
        Referenz und React rendert neu.
      </h4>
      <h4>-------------------------</h4>
      <h2>Teil 2</h2>
      <div> {counter.kommentar}</div>
      <div>{counter2.wert}</div>
      <button
        onClick={() => {
          console.log(counter2);
          setCounter2({ ...counter2, wert: counter2.wert + 1 });
        }}
      >
        Klick mich 2
      </button>
      <input
        onChange={(e) =>
          setCounter2({ ...counter2, kommentar: e.target.value })
        }
      />
      <h4>
        Erklärung Teil 2: Der State counter2 ist ein Objekt mit zwei
        Eigenschaften (wert und kommentar).
        <br />
        Button: Beim Klick wird mit dem Spread-Operator (...counter2) ein neues
        Objekt erstellt. Zuerst werden alle bisherigen Eigenschaften
        hineinkopiert, danach wird wert mit dem neuen Wert überschrieben. Die
        Reihenfolge ist wichtig: Was weiter hinten steht, überschreibt das
        Vorherige.
        <br />
        Input: onChange wird bei jeder Eingabe (jedem Tastendruck) ausgelöst.
        React übergibt dabei automatisch ein Event-Objekt, hier e genannt.
        e.target ist das Element, das das Event ausgelöst hat (das Eingabefeld),
        und e.target.value ist der aktuelle Text darin. Auch hier wird mit
        ...counter2 alles kopiert und nur kommentar überschrieben.
        <br />
        Ohne Spread-Operator würde die jeweils andere Eigenschaft verloren gehen
        (beim Klick kommentar, bei der Eingabe wert), denn die set-Funktion von
        useState ersetzt den ganzen State und ergänzt ihn nicht.
        <br />
        Weil jedes Mal ein neues Objekt (neue Referenz) entsteht, erkennt React
        die Änderung und rendert neu.
        <br />
        console.log(counter2) zeigt dabei noch den alten Wert, weil der neue
        State erst beim nächsten Rendern gilt.
      </h4>
    </div>
  );
}
