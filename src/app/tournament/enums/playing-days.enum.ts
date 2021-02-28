export class PlayingDays {
  public static workDays = 1;
  public static weekEnd = 2;
  public static wholeWeek = 3;
}

export class PlayingDaysNames {
  public static workDays = 'Work days';
  public static weekEnd = 'Week end';
  public static wholeWeek = 'Whole week';
}

export const PlayingDaysNamesFromNumber = {
  [PlayingDays.workDays]: PlayingDaysNames.workDays,
  [PlayingDays.weekEnd]: PlayingDaysNames.weekEnd,
  [PlayingDays.wholeWeek]: PlayingDaysNames.wholeWeek,
};
