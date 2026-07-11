import { useState, useEffect, useRef } from "react";
import type { CustomDeck } from "../utils/storage";
import { saveCustomDeck } from "../utils/storage";

interface CardEntry {
  id: string;
  value: string;
}

interface CustomDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  editDeck?: CustomDeck | null;
}

const DEFAULT_EMOJI = "🃏";
const MIN_CARDS = 20;
const MAX_CARDS = 40;

function generateCardId(): string {
  return crypto.randomUUID?.() ?? "card_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
}

function newCardEntry(value = ""): CardEntry {
  return { id: generateCardId(), value };
}

export const CustomDeckModal = ({ isOpen, onClose, onSaved, editDeck }: CustomDeckModalProps) => {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(DEFAULT_EMOJI);
  const [cards, setCards] = useState<CardEntry[]>([newCardEntry()]);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const cardsListRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Resetear o precargar cuando se abre el modal
  useEffect(() => {
    if (!isOpen) return;

    if (editDeck) {
      setName(editDeck.name);
      setEmoji(editDeck.emoji || DEFAULT_EMOJI);
      setCards(editDeck.deck.length > 0
        ? editDeck.deck.map((v) => newCardEntry(v))
        : [newCardEntry()]
      );
    } else {
      setName("");
      setEmoji(DEFAULT_EMOJI);
      setCards([newCardEntry()]);
    }
    setError("");
    setWarning("");
  }, [isOpen, editDeck]);

  // Focus trap + Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const overlay = overlayRef.current;
        if (!overlay) return;
        const focusable = overlay.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Focus first focusable element on open
    const timer = setTimeout(() => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const firstFocusable = overlay.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddCard = () => {
    if (cards.length >= MAX_CARDS) return;
    setCards([...cards, newCardEntry()]);
    // Auto-scroll after next render
    requestAnimationFrame(() => {
      if (cardsListRef.current) {
        cardsListRef.current.scrollTop = cardsListRef.current.scrollHeight;
      }
    });
  };

  const handleRemoveCard = (id: string) => {
    if (cards.length <= MIN_CARDS) return;
    setCards(cards.filter(c => c.id !== id));
  };

  const handleCardChange = (id: string, value: string) => {
    setCards(cards.map(c => (c.id === id ? { ...c, value } : c)));
    setError("");
    setWarning("");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setError("");
    setWarning("");
  };

  const handleEmojiChange = (value: string) => {
    setEmoji(value);
    setError("");
    setWarning("");
  };

  const handleSave = () => {
    setWarning("");
    // Validaciones
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("El nombre de la baraja es obligatorio.");
      return;
    }

    const nonEmptyCards = cards
      .map(c => c.value.trim())
      .filter(c => c !== "");

    if (nonEmptyCards.length < MIN_CARDS) {
      setError(`La baraja debe tener al menos ${MIN_CARDS} cartas (tienes ${nonEmptyCards.length}).`);
      return;
    }
    if (nonEmptyCards.length > MAX_CARDS) {
      setError(`La baraja no puede tener más de ${MAX_CARDS} cartas (tienes ${nonEmptyCards.length}).`);
      return;
    }

    // Duplicate check (case-insensitive)
    const lowerCards = nonEmptyCards.map(c => c.toLowerCase());
    const duplicates = lowerCards.filter((c, i) => lowerCards.indexOf(c) !== i);
    if (duplicates.length > 0) {
      setWarning(`Hay cartas duplicadas. Se guardarán todas igualmente.`); // non-blocking warning
    }

    const deck: CustomDeck = {
      id: editDeck?.id ?? (crypto.randomUUID?.() ?? "deck_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9)),
      name: trimmedName,
      emoji: emoji.trim() || DEFAULT_EMOJI,
      deck: nonEmptyCards,
    };

    saveCustomDeck(deck);
    onSaved();
    onClose();
  };

  const isAddDisabled = cards.length >= MAX_CARDS;
  const isRemoveDisabled = cards.length <= MIN_CARDS;
  const filledCount = cards.filter(c => c.value.trim()).length;

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 id="modal-title" className="modal__title">
          {editDeck ? "Editar baraja" : "Crear baraja personalizada"}
        </h2>

        {error && <p className="modal__error" role="alert">{error}</p>}
        {warning && <p className="modal__error" role="status">{warning}</p>}

        <div className="modal__field">
          <label htmlFor="deck-emoji" className="modal__label">Emoji</label>
          <input
            id="deck-emoji"
            type="text"
            className="modal__input modal__input--emoji"
            value={emoji}
            onChange={(e) => handleEmojiChange(e.target.value)}
            placeholder={DEFAULT_EMOJI}
            maxLength={4}
          />
        </div>

        <div className="modal__field">
          <label htmlFor="deck-name" className="modal__label">Nombre de la baraja</label>
          <input
            id="deck-name"
            type="text"
            className="modal__input"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Ej: Videojuegos"
          />
        </div>

        <div className="modal__field">
          <div className="modal__label-row">
            <span className="modal__label">Cartas ({filledCount}/{MAX_CARDS})</span>
            <span className="modal__hint">Mínimo {MIN_CARDS}</span>
          </div>

          <div className="modal__cards-list" ref={cardsListRef}>
            {cards.map((card, index) => (
              <div key={card.id} className="modal__card-row">
                <span className="modal__card-index">{index + 1}.</span>
                <input
                  id={`deck-card-${card.id}`}
                  type="text"
                  className="modal__input modal__input--card"
                  value={card.value}
                  onChange={(e) => handleCardChange(card.id, e.target.value)}
                  placeholder={`Carta ${index + 1}`}
                />
                <button
                  type="button"
                  className="modal__btn-remove"
                  onClick={() => handleRemoveCard(card.id)}
                  disabled={isRemoveDisabled}
                  title={isRemoveDisabled ? `Mínimo ${MIN_CARDS} cartas` : "Eliminar carta"}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="modal__btn-add"
            onClick={handleAddCard}
            disabled={isAddDisabled}
          >
            + Añadir carta
          </button>
        </div>

        <div className="modal__actions">
          <button type="button" className="modal__btn modal__btn--cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="modal__btn modal__btn--save" onClick={handleSave}>
            {editDeck ? "Guardar cambios" : "Crear baraja"}
          </button>
        </div>
      </div>
    </div>
  );
};
