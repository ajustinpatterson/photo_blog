export const formatMetadata = ({
  media_metadata,
  context,
}: Record<string, any>): Record<string, string> => {
  const {
    Make,
    Model,
    ExposureTime,
    FNumber,
    ISO,
    CreateDate,
    ShutterSpeedValue,
    ApertureValue,
    ExposureCompensation,
    Flash,
    FocalLength,
  } = media_metadata;

  return {
    Camera: {
      ...(Make && {Make})
      ...(Model && Model)
    },
    ...(context?.custom?.caption && { caption: context.custom.caption }),
    ...(context?.custom?.description && {
      description: context.custom.description,
    }),
    ...(FNumber || (ApertureValue && { FStop: FNumber || ApertureValue })),
    ...(ShutterSpeedValue ||
      (ExposureTime && { ShutterSpeed: ShutterSpeedValue || ExposureTime })),
    ISO,
    CreateDate,
    ExposureCompensation,
    Flash,
    FocalLength,
  };
};
