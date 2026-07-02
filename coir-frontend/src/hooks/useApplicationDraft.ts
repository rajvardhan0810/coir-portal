import { useEffect, useState } from "react";

const STORAGE_KEY =
  "coir_application_draft";

export function useApplicationDraft() {
  const [draft, setDraft] =
    useState<any>({});

  useEffect(() => {
    const saved =
      localStorage.getItem(
        STORAGE_KEY,
      );

    if (saved) {
      setDraft(JSON.parse(saved));
    }
  }, []);

  function saveDraft(
    data: Record<string, any>,
  ) {
    const updated = {
      ...draft,
      ...data,
    };

    setDraft(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated),
    );
  }

  function clearDraft() {
    localStorage.removeItem(
      STORAGE_KEY,
    );

    setDraft({});
  }

  return {
    draft,
    saveDraft,
    clearDraft,
  };
}