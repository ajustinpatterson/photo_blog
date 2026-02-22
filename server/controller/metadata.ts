type MediaMetadata = {
  Make?: string;
  Model?: string;
  ExposureTime?: string;
  FNumber?: string;
  ISO?: string;
  CreateDate?: string;
  ShutterSpeedValue?: string;
  ApertureValue?: string;
  ExposureCompensation?: string;
  Flash?: string;
  FocalLength?: string;
};

type Context = {
  custom?: {
    caption?: string;
    description?: string;
  };
};

type MetadataEntry = Record<string, string | undefined>;

export const formatMetadata = ({
  media_metadata,
  context,
}: {
  media_metadata: MediaMetadata;
  context?: Context;
}): MediaMetadata[] => {
  const result: Record<string, unknown>[] = [];
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

  const processedMetadata = {
    ...(context?.custom?.caption && { caption: context.custom.caption }),
    ...(context?.custom?.description && {
      description: context.custom.description,
    }),
    ...((FNumber || ApertureValue) && { FStop: FNumber ?? ApertureValue }),
    ...((ShutterSpeedValue || ExposureTime) && {
      ShutterSpeed: ShutterSpeedValue ?? ExposureTime,
    }),
    Make,
    Model,
    ISO,
    CreateDate,
    ExposureCompensation,
    Flash,
    FocalLength,
  };

  for (const [key, value] of Object.entries(processedMetadata)) {
    result.push({ [key]: value });
  }

  return result;
};
