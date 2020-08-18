<div class="KOMGuideNotice">

This document is a work-in-progress. Feel free to ask questions on [Mastodon](https://merveilles.town/@rosano) or [Twitter](https://twitter.com/rosano).

</div>

Kommit helps you remember what you learn via flashcards and [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition).

When one side is presented, you try to recall the other before flipping it over – this [active recall](https://en.wikipedia.org/wiki/Active_recall) strengthens your memory more than multiple-choice questions.

The cards are presented when you are likely to forget, which [aids memory retention](https://elearninginfographics.com/memory-retention-and-the-forgetting-curve-infographic/) and also reduces the amount of time you need to study. This method can make remembering a choice rather than leaving it up to chance.

It's great for languages, but can also be applied to other domains.

# List of decks

This is the starting screen of the app. From here you can create a new deck or select an existing deck.

# Deck page

Once you have selected a deck, you can customize how to present the cards, see some statistics from your reviews, and rename or delete the deck. Click on *Cards* to manage cards. Click *Play* to start the memory game.

## Game options

*Play audio* will automatically play any recorded audio for the card.

*Read front* or *Read back* will speak the text using any language available on your device. By default it uses the language of your computer, but you can set a [language code](https://www.w3schools.com/tags/ref_language_codes.asp) if your cards use multiple languages. If *Play audio* is enabled and there is recorded audio for the same side, only the audio will play.

By default, the cards will be presented both front-to-back and back-to-front, but *Skip reversed cards* will disable the latter.

# Memory game

During a review, the cards will be presented in a random order. Try to recall the opposite side without looking, then *Flip* the card to reveal the following response buttons to schedule the card's next appearance:

- *Relearn*: within the next ten minutes, restart the schedule
- *Closer*
    - First time: within the next ten minutes
    - Second time: after a day or so
    - Subsequently: after progressively larger periods
- *Normal*
    - First time: within the next ten minutes
    - Second time: after a few days
    - Subsequently: after progressively larger periods, moreso than *Closer*
- *Farther*
    - First time: after four days
    - Subsequently: after progressively larger periods, moreso than *Normal*

A maximum of 10 unseen cards will be presented in one game.

## Tips

Evaluate yourself based on personal goals. Are you practicing speed? a certain way of responding? a physical sensation? If you are studying languages, are you working on pronounciation? understanding? spelling? grammar?

If your device has a physical keyboard, streamline your responses with [shortcuts](#shortcuts).

You can try [mneumonics and other memory tricks](https://en.wikipedia.org/wiki/Moonwalking_with_Einstein) to help remember – usually the more personal it is, the better.

# Card browser

On the left side of the interface, you can create, search, and select cards. On the right side, you can edit the details.

<div class="KOMGuideNotice">

Editing the same card on multiple devices at the same time can result in data loss. Editing different cards or playing the game while editing cards is safe.

</div>

*Front text* or *Back text* can be used for the question or answer

Each side can have a short audio recording. Click *Record* and allow microphone access to begin recording, then click again to end.

The *Read* button speaks the text using the language chosen on the deck page.

*Notes* can be used for any personal comments or memory aids.

*Tags* can be used to organize cards and make them easier to find.

# Statistics

Various figures are calculated based on the state of each card and the amount of time spent.

On the deck page, calculations are based on the selected deck. On the List of decks, calculations are based on all decks combined.

Cards are visually encoded based on the following states:

<table class="KOMGuideStatisticsLegend">

<tr>
	<td><span style="background: KOMGuideTokenColorUnseen;"></span></td>
	<td>Unseen</td>
	<td>without any reviews, not scheduled</td>
</tr>

<tr>
	<td><span style="background: KOMGuideTokenColorRelearning;"></span></td>
	<td>Relearning</td>
	<td>the *Relearn* button was pressed</td>
</tr>

<tr>
	<td><span style="background: KOMGuideTokenColorDeveloping;"></span></td>
	<td>Developing</td>
	<td>scheduled to appear within 21 days</td>
</tr>

<tr>
	<td><span style="background: KOMGuideTokenColorMature;"></span></td>
	<td>Mature</td>
	<td>scheduled to appear after 21 days</td>
</tr>

<tr>
	<td><span style="background: KOMGuideTokenColorSuspended;"></span></td>
	<td>Suspended</td>
	<td>the card was removed from the schedule</td>
</tr>

</table>

## Today

All statistics in this section are for the current day.

- *Total cards*: number of cards reviewed.
- *Time*: minutes passed during the memory game.
- *Review accuracy*: percentage of review cards remembered correctly; new cards are not counted.

## Upcoming cards

The number of *Developing* and *Mature* cards scheduled on a given day.

## Time

Minutes passed on a given day during the memory game on Unseen, Relearning, Developing, and Mature cards.

## Collection

Counting the number of cards based on its state.

# Shortcuts

<div class="KOMGuideNotice">

*AccessKey* refers to a one or more shortcut keys followed by a single character. Usually it's `Alt` on Windows or `Control+Alt` on macOS, but it changes [based on your browser and operating system](https://www.w3schools.com/tags/att_global_accesskey.asp#table2).

*Launcher* refers to the app's command runner: press `Alt+Enter`, type the command, then press `Enter` to run.

</div>

| List of decks ||
:--- | ---
| Create new deck | `AccessKey` + `n` |
| `KOMReviewLauncherItemSelectDeckText` | Launcher |
| `KOMReviewLauncherItemDebugFlushDataText` | Launcher |

| Deck page ||
:--- | ---
| Show cards | `AccessKey` + `c` |
| Play memory game | `AccessKey` + `g` |
| Close | `Escape` |
| `KOMReviewDetailPlayButtonReviewingText` | Launcher |
| `KOMReviewDetailPlayButtonUnseenText` | Launcher |

| Memory game ||
:--- | ---
| Flip card | `Space` |
| Respond *Relearn* | `1` |
| Respond *Closer* | `2` |
| Respond *Normal* | `3` or `Space` |
| Respond *Farther* | `4` |
| Repeat Question | `q` |
| Repeat Answer | `a` |
| Close | `Escape` |

| List of cards ||
:--- | ---
| Create new card | `AccessKey` + `n` |
| Select previous or next card, if filter field is focused | `Up` or `Down` |
| Copy tags to new card | `AccessKey` + `t` |
| Clear filter text and selected card, focus filter field | `Escape` |
| Close, if filter field is focused | `Escape` |
| `KOMReviewLauncherItemDebugCardText` | Launcher |

| Global ||
:--- | ---
| `KOMReviewLauncherItemSendLoginLinkText` | Launcher |
| Launcher | `Alt-Enter` |

# What is remoteStorage?

[remoteStorage](https://remotestorage.io) is an incredible open-source technology for synchronizing data between multiple devices and making it available offline.

It allows the same data to be used in different ways by multiple apps. You could think of it as a USB key for your documents that you can plug into websites to work on your stuff.

You can get one for free from [5apps](https://5apps.com/storage/) or [host your own](https://wiki.remotestorage.io/Servers).

