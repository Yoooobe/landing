"use client";

import { MARKETING_ICON_MANIFEST } from "@/config/marketing-icon-manifest";
import { getMarketingLucideIcon } from "@/lib/marketing-icon-registry";
import { Box, Card, Flex, Stack, Text, TextInput } from "@sanity/ui";
import { useMemo, useState } from "react";
import { set, type StringInputProps, unset } from "sanity";

/**
 * Visual picker for marketing feature-card icons (Lucide manifest).
 * Complements the string value stored in Sanity.
 */
export function IconPickerInput(props: StringInputProps) {
  const { value, onChange, readOnly } = props;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const t = query.trim().toLowerCase();
    if (!t) return [...MARKETING_ICON_MANIFEST];
    return MARKETING_ICON_MANIFEST.filter(
      (e) =>
        e.title.toLowerCase().includes(t) ||
        e.id.toLowerCase().includes(t) ||
        e.lucideExport.toLowerCase().includes(t),
    );
  }, [query]);

  return (
    <Stack space={4}>
      <TextInput
        placeholder="Pesquisar ícone…"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        disabled={readOnly}
      />
      <Flex wrap="wrap" gap={2}>
        {filtered.map((entry) => {
          const Cmp = getMarketingLucideIcon(entry.id);
          const selected = value === entry.id;
          return (
            <Card
              key={entry.id}
              padding={2}
              radius={2}
              shadow={1}
              tone={selected ? "primary" : "transparent"}
              style={{
                cursor: readOnly ? "default" : "pointer",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: selected ? "var(--card-focus-ring-color)" : "var(--card-border-color)",
              }}
            >
              <button
                type="button"
                disabled={readOnly}
                onClick={() => onChange(set(entry.id))}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  minWidth: 72,
                  padding: 4,
                  background: "transparent",
                  border: "none",
                  cursor: readOnly ? "default" : "pointer",
                  color: "inherit",
                }}
              >
                <Box style={{ color: "var(--card-muted-fg-color)" }}>
                  <Cmp size={22} strokeWidth={2} aria-hidden />
                </Box>
                <Text size={0} style={{ maxWidth: 88, textAlign: "center" }}>
                  {entry.title}
                </Text>
              </button>
            </Card>
          );
        })}
      </Flex>
      {value ? (
        <Flex gap={2}>
          <Text size={1}>
            Selecionado: <code>{value}</code>
          </Text>
          {!readOnly ? (
            <button type="button" onClick={() => onChange(unset())} style={{ fontSize: 12 }}>
              Limpar
            </button>
          ) : null}
        </Flex>
      ) : (
        <Text size={1} muted>
          Nenhum ícone — o site usa o ícone predefinido (Sparkles) salvo se carregar SVG abaixo.
        </Text>
      )}
    </Stack>
  );
}
