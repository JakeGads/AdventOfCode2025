import nltk

try:
    from nltk.corpus import words
except ImportError:
    nltk.download('words')
    from nltk.corpus import words

know_letters = input("Enter known letters (use '_' for unknowns, e.g., '_a_e_'): ").strip().lower()
banned_letters = input("Enter letters not in the word (e.g., 'bcd'): ").strip().lower()
unknown_locations = input("Enter letters in the word but unknown positions (e.g., 'rts'): ").strip().lower()
word_length = 5

for word in [
    words for words in words.words() 
    if len(words) == word_length
    and all(letter in words for letter in unknown_locations)
    and all(letter not in words for letter in banned_letters)
]:
    is_match = True
    for i, letter in enumerate(know_letters):
        if letter != '_' and word[i] != letter:
            is_match = False
            break
    if is_match:
        print(word)