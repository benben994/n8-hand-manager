import PokerCards from 'images/poker-cards.png';

export default function NavBar() {
  return (
    <header>
      <div className="flex items-center container mx-auto p-4">
        <img src={PokerCards} className="h-16" />
        <h1 className="text-3xl ml-5">Natural8 Hand Manager</h1>
      </div>
    </header>
  );
}
