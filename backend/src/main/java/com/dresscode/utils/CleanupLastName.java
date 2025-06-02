package com.dresscode.utils;

/**
 * Utility class for cleaning up last names.
 * <p>
 * The class provides one method, {@link #clean(String)}, which takes a last
 * name
 * and returns a cleaned up version. The cleaning process consists of two steps:
 * <p>
 * 1. Trim and replace any run of whitespace with a single space.
 * 2. Split on that single space and capitalize each part.
 */
public class CleanupLastName {

    /**
     * Cleans up a last name.
     *
     * @param lastName the last name to clean up
     * @return the cleaned up last name
     */
    public static String clean(String lastName) {
        if (lastName == null) {
            return "";
        }

        // 1) Trim and replace any run of whitespace with a single space
        String reduced = lastName.trim().replaceAll("\\s+", " ");
        if (reduced.isEmpty()) {
            return "";
        }

        // 2) Split on that single space (so "van Helsing" → ["van", "Helsing"])
        String[] parts = reduced.split(" ");

        // 3) Capitalize each part (first letter uppercase, rest lowercase)
        StringBuilder result = new StringBuilder(parts.length * 8);
        for (int i = 0; i < parts.length; i++) {
            String part = parts[i];
            if (part.isEmpty()) {
                continue; // skip any accidental empty part
            }
            String capitalized;
            if (part.length() == 1) {
                capitalized = part.toUpperCase();
            } else {
                capitalized = part.substring(0, 1).toUpperCase()
                        + part.substring(1).toLowerCase();
            }

            result.append(capitalized);
            if (i < parts.length - 1) {
                result.append(' ');
            }
        }

        return result.toString();
    }
}
