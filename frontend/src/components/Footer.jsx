export default function Footer() {
  return (
    <footer className="text-muted-foreground bg-background px-6 py-4 text-center text-xs">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
      </div>
    </footer>
  );
}
