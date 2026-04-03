/** Generate deep links to external genealogy research sites for a given person */
export function getResearchLinks(
  firstName: string,
  lastName: string,
  birthPlace?: string,
) {
  const surname = lastName.split(" ")[0]; // Use first surname only

  return {
    familySearch: {
      records: `https://www.familysearch.org/search/record/results?q.surname=${encodeURIComponent(surname)}&q.givenName=${encodeURIComponent(firstName)}${birthPlace ? `&q.birthLikePlace=${encodeURIComponent(birthPlace)}` : ""}`,
      tree: `https://www.familysearch.org/tree/find/name?search=1&surname=${encodeURIComponent(surname)}&givenName=${encodeURIComponent(firstName)}`,
    },
    ine: {
      frequency: `https://www.ine.es/apellidos/formGeneralresult.do?vista=1&orig=ine&cmb6=${encodeURIComponent(surname)}&L=0`,
      map: `https://www.ine.es/apellidos/formGeneralresult.do?vista=3&orig=ine&cmb3=99&cmb6=${encodeURIComponent(surname)}&L=0`,
    },
    pares: {
      search: `https://pares.mcu.es/ParesBusquedas20/catalogo/search?texto=${encodeURIComponent(surname)}`,
      migraciones:
        "https://pares.mcu.es/MovimientosMigratorios/viewer/staticContent.form?viewName=inicio",
    },
    cemla: {
      search: "https://cemla.com/buscador/",
    },
  };
}
